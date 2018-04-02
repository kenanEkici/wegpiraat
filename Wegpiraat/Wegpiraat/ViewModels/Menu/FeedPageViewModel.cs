using System;
using Prism.Events;
using Wegpiraat.Datalayer.Services;
using Prism.Navigation;
using System.Collections.Generic;
using System.Threading.Tasks;
using Wegpiraat.Datalayer.Domain;
using Wegpiraat.Converters;
using System.Collections.ObjectModel;
using Prism.Commands;
using System.Diagnostics;
using System.Linq;
using Prism;

namespace Wegpiraat.ViewModels
{
    public class FeedPageViewModel : ChildViewModelBase, INavigationAware, IActiveAware
    {
        private IWegpiraatService _wegpiraatService;
        private IAuthService _authService;
        private INavigationService _navigationService;

        public DelegateCommand<string> WegpiraatDetailCommand => new DelegateCommand<string>(async (id) => await WegpiraatDetailCommandExecuted(id));
        public DelegateCommand<string> LikeCommand => new DelegateCommand<string>(async (id) => await LikeCommandExecuted(id));
        public DelegateCommand RefreshCommand => new DelegateCommand(async () => await GetData());

        #region properties

        private bool _isActive;
        public bool IsActive
        {
            get => _isActive;
            set { _isActive = value; if (value) GetData(); }
        }

        private string sorting = "";

        private ObservableCollection<Wegpiraten> _wegpiraten;
        public ObservableCollection<Wegpiraten> Wegpiraten
        {
            get { return _wegpiraten; }
            set { SetProperty(ref _wegpiraten, value); }
        }

        private bool _isBusy;

        public event EventHandler IsActiveChanged;

        public bool IsBusy
        {
            get { return _isBusy; }
            set { SetProperty(ref _isBusy, value); }
        }

        #endregion

        #region ctor

        public FeedPageViewModel(IEventAggregator ea, INavigationService navService) : base(ea)
        {
            Title = "Wegpiraten";
            _wegpiraatService = new WegpiraatService();
            _authService = new AuthService();
            _navigationService = navService;
        }

        #endregion
        
        public async Task GetData()
        {
            IsBusy = true;
            var user = await _authService.RequestUserInformation();
            List<Wegpiraten> wegpiraten = null;

            if (user != null)
                if (sorting != "")
                {
                    switch (sorting)
                    {
                        case "likes": wegpiraten = await _wegpiraatService.GetWegpiratenByArrayId(new PostsArray { IdArray = user.Likes }); break;
                        case "posts": wegpiraten = await _wegpiraatService.GetWegpiratenByArrayId(new PostsArray { IdArray = user.Posts }); break;
                    }
                }
                else
                {
                    wegpiraten = await _wegpiraatService.GetAllWegpiraten();
                }

                foreach (var wegpiraat in wegpiraten)
                    foreach (var like in wegpiraat.Likes)
                        if (like.LikedBy.Equals(user.Username))
                            wegpiraat.IsLiked = true;
                        else
                            wegpiraat.IsLiked = false;

                Wegpiraten = ExtensionHelper.ToObservableCollection(wegpiraten);

                IsBusy = false;
        }

        private async Task WegpiraatDetailCommandExecuted(string id)
        {
            var post = Wegpiraten.ToList().First((wegpiraat) => wegpiraat.Id == id);
            var param = new NavigationParameters();
            param.Add("post", post);
            await _navigationService.NavigateAsync("WegpiraatDetailPage", param);
        }

        private async Task LikeCommandExecuted(string id)
        {
            Wegpiraten index = new Datalayer.Domain.Wegpiraten();

            foreach (var wegpiraat in Wegpiraten)
            {
                if (wegpiraat.Id == id)
                {
                    index = wegpiraat;
                }
            }

            var like = await _wegpiraatService.LikeWegpiraat(id);
            if (like != null)
            {
                if (!like.IsLiked)
                {
                    index.IsLiked = false;
                    index.LikesCount = --index.LikesCount;
                }
                else
                {
                    index.IsLiked = true;
                    index.LikesCount = ++index.LikesCount;
                }
            }
        }

        #region nav

        public void OnNavigatedFrom(NavigationParameters parameters) { }

        public async void OnNavigatedTo(NavigationParameters parameters)
        {
            sorting = parameters.GetValue<string>("sort");
            await GetData();
        }

        #endregion
    }
}
