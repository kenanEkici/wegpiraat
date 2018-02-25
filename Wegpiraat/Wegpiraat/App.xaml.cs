using Prism.DryIoc;
using System.Diagnostics;
using Wegpiraat.Datalayer.Services;
using Wegpiraat.Views;
using Xamarin.Forms;

namespace Wegpiraat
{
    public partial class App : PrismApplication
    {
        public App(IPlatformInitializer initializer = null) : base(initializer) { }
        private IAuthService _authService;

        protected override void OnInitialized()
        {
            InitializeComponent();            
            _authService = new AuthService();
        }

        protected async override void OnStart()
        {
            if (await _authService.HasApiConnection() && await _authService.UserIsAuthorized())
                await NavigationService.NavigateAsync("/NavigationPage/MenuPage");
            else
                await NavigationService.NavigateAsync("/LoginPage/");
        }

        protected async override void OnResume()
        {
            if (await _authService.HasApiConnection() && await _authService.UserIsAuthorized()) { } //just continue
            else
                await NavigationService.NavigateAsync("/LoginPage/");
        }

        protected override void RegisterTypes()
        {
            Container.RegisterTypeForNavigation<NavigationPage>();
            Container.RegisterTypeForNavigation<LoginPage>();
            Container.RegisterTypeForNavigation<MenuPage>();
            Container.RegisterTypeForNavigation<FeedPage>();
            Container.RegisterTypeForNavigation<SearchPage>();
            Container.RegisterTypeForNavigation<ProfilePage>();
            Container.RegisterTypeForNavigation<RegisterPage>();
            Container.RegisterTypeForNavigation<ValidationSentPage>();
            Container.RegisterTypeForNavigation<ForgotPasswordPage>();
            Container.RegisterTypeForNavigation<ConfirmPasswordResetPage>();
            Container.RegisterTypeForNavigation<UploadWegpiraatPage>();
            Container.RegisterTypeForNavigation<WegpiraatDetailPage>();
            Container.RegisterTypeForNavigation<MyPostsPage>();
            Container.RegisterTypeForNavigation<MyLikesPage>();
            Container.RegisterTypeForNavigation<MyCommentsPage>();
        }
    }
}

