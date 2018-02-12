using Prism.DryIoc;
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
            if (await _authService.UserIsAuthorized())
                await NavigationService.NavigateAsync("/NavigationPage/MenuPage");
            else
                await NavigationService.NavigateAsync("/LoginPage/");
        }

        protected async override void OnResume()
        {            
            if (! await _authService.UserIsAuthorized())
                await NavigationService.NavigateAsync("/LoginPage/");
            //else continue
        }

        protected override void RegisterTypes()
        {
            Container.RegisterTypeForNavigation<NavigationPage>();
            Container.RegisterTypeForNavigation<LoginPage>();
            Container.RegisterTypeForNavigation<MenuPage>();
            Container.RegisterTypeForNavigation<FeedPage>();
            Container.RegisterTypeForNavigation<SearchPage>();
            Container.RegisterTypeForNavigation<ProfilePage>();
        }
    }
}

