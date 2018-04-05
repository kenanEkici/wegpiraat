using Prism.Commands;
using Prism.Mvvm;
using Prism.Navigation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wegpiraat.Datalayer.Domain;
using Wegpiraat.Datalayer.Services;

namespace Wegpiraat.ViewModels.Wegpiraat
{
    public class WegpiraatDetailCommentPageViewModel : BindableBase, INavigatedAware
    {
        private IWegpiraatService _wegpiraatService;
        private IAuthService _authService;
        private INavigationService _navigationService;

        public DelegateCommand CommentCommand => new DelegateCommand(async () => await CommentToPost());

        #region properties

        private Wegpiraten _post;
        public Wegpiraten Post
        {
            get { return _post; }
            set { SetProperty(ref _post, value); }
        }

        private string _error;
        public string Error
        {
            get { return _error; }
            set { SetProperty(ref _error, value); }
        }

        private string _comment;
        public string Comment
        {
            get { return _comment; }
            set { SetProperty(ref _comment, value); }
        }

        #endregion

        #region ctor

        public WegpiraatDetailCommentPageViewModel(INavigationService navigationService)
        {
            _wegpiraatService = new WegpiraatService();
            _authService = new AuthService();
            _navigationService = navigationService;
        }

        #endregion

        public async Task CommentToPost()
        {
            if (Comment == string.Empty)
            {
                Error = "Comment can not be empty";
            }
            else
            {
                //check character count etc

                var comment = new Comment()
                {
                    PostId = Post.Id,
                    CommentData = Comment,
                    PostedBy = _authService.AuthorizedUserExistsInDatabase().Username,
                    PostedAt = DateTime.Now
                };

                var addedComment = await _wegpiraatService.CommentOnWegpiraat(comment);
                
                if (addedComment != null)
                {
                    Post.Comments.Add(addedComment);
                    Post.CommentsCount++;
                    var param = new NavigationParameters
                    {
                        { "post", Post}
                    };
                    await _navigationService.GoBackAsync(param);
                }
                else
                {
                    //throw error or sumfun
                }
                
            }
        }

        public void OnNavigatedFrom(NavigationParameters parameters) { }

        public void OnNavigatedTo(NavigationParameters parameters)
        {
            Post = parameters.GetValue<Wegpiraten>("post");          
        }
    }
}
