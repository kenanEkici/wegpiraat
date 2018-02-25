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

namespace Wegpiraat.ViewModels
{
    public class FeedPageViewModel : ChildViewModelBase
    {
        private IWegpiraatService _wegpiraatService;
        private IAuthService _authService;
        private INavigationService _navigationService;

        private ObservableCollection<Wegpiraten> _wegpiraten;
        public ObservableCollection<Wegpiraten> Wegpiraten
        {
            get { return _wegpiraten; }
            set { SetProperty(ref _wegpiraten, value); }
        }
        private bool _isBusy;
        public bool IsBusy
        {
            get { return _isBusy; }
            set { SetProperty(ref _isBusy, value); }
        }

        public DelegateCommand<string> WegpiraatDetailCommand => new DelegateCommand<string>(async (path) => await WegpiraatDetailCommandExecuted(path));
        public DelegateCommand<string> LikeCommand => new DelegateCommand<string>(async (id) => await LikeCommandExecuted(id));
        public DelegateCommand RefreshCommand => new DelegateCommand(GetData);

        public FeedPageViewModel(IEventAggregator ea, INavigationService navService) : base(ea)
        {
            Title = "Wegpiraten";
            _wegpiraatService = new WegpiraatService();
            _authService = new AuthService();
            _navigationService = navService;
            GetData();
        }

        public async void GetData()
        {
            IsBusy = true;
            var user = await _authService.RequestUserInformation();
            var wegpiraten = await _wegpiraatService.GetAllWegpiraten();
            foreach(var wegpiraat in wegpiraten)
            {
                foreach(var like in wegpiraat.Likes)
                {
                    if (like.LikedBy.Equals(user.Username))
                    {
                        wegpiraat.IsLiked = true;
                    }
                    else
                    {
                        wegpiraat.IsLiked = false;
                    }
                }
            }
            Wegpiraten = ExtensionHelper.ToObservableCollection(wegpiraten);
            IsBusy = false;
        }

        private async Task WegpiraatDetailCommandExecuted(string path)
        {
            //go to detail page 
            await _navigationService.NavigateAsync(path);
        }

        private async Task LikeCommandExecuted(string id)
        {
            //a huge todo
            Wegpiraten index = new Datalayer.Domain.Wegpiraten();

            foreach (var wegpiraat in Wegpiraten)
            {
                if (wegpiraat.Id == id)
                {
                    index = wegpiraat;
                }
            }

            var like = await _wegpiraatService.LikeWegpiraat(id);

            if (!like.IsLiked || like == null)
            {
                index.IsLiked = false;
            }
            else
            {
                index.IsLiked = true;
            }
        }
    }
}
