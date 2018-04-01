using Prism.Commands;
using Prism.Mvvm;
using Prism.Navigation;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wegpiraat.Datalayer.Domain;
using Wegpiraat.Datalayer.Services;

namespace Wegpiraat.ViewModels
{
    public class WegpiraatDetailPageViewModel : BindableBase, INavigatedAware
    {
        private IWegpiraatService _wegpiraatService;
        private IAuthService _authService;
        private INavigationService _navigationService;

        #region properties

        public DelegateCommand<string> CommentPageCommand => new DelegateCommand<string>(async (path) => await OpenCommentPage(path));

        private Wegpiraten _post;
        public Wegpiraten Post
        {
            get { return _post; }
            set { SetProperty(ref _post, value); }
        }

        private ObservableCollection<Comment> _comments = new ObservableCollection<Comment>();
        public ObservableCollection<Comment> Comments
        {
            get { return _comments; }
            set => SetProperty(ref _comments, value);
        }

        private string _firstToComment;
        public string FirstToComment
        {
            get { return _firstToComment; }
            set { SetProperty(ref _firstToComment, value); }
        }
                        
        #endregion properties

        #region ctor

        public WegpiraatDetailPageViewModel(INavigationService _navservice)
        {
            _wegpiraatService = new WegpiraatService();
            _authService = new AuthService();
            _navigationService = _navservice;
        }

        #endregion ctor

        public async Task OpenCommentPage(string path)
        {
            var param = new NavigationParameters();
            param.Add("post", Post);
            await _navigationService.NavigateAsync(path, param);
        }

        public void OnNavigatedFrom(NavigationParameters parameters)
        {
            var post = parameters.GetValue<Wegpiraten>("post");
            Post = post;
            if (Post != null)
            {
                Comments = new ObservableCollection<Comment>(Post.Comments);
            }
        }

        public void OnNavigatedTo(NavigationParameters parameters)
        {
            Post = parameters.GetValue<Wegpiraten>("post");
            
            if (Post.CommentsCount == 0)
            {
                FirstToComment = "No comments on this post. Be the first!";
            }
            else
            {
                if (Post.Comments == null)
                    Post.Comments = new List<Comment>();
                Comments = new ObservableCollection<Comment>(Post.Comments);
            }
        }
    }
}
