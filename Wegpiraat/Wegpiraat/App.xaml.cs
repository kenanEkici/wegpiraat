using Prism.DryIoc;
using Wegpiraat.Views;
using Xamarin.Forms;

namespace Wegpiraat
{
    public partial class App : PrismApplication
    {
        public App(IPlatformInitializer initializer = null) : base(initializer) { }

        protected override void OnInitialized()
        {
            InitializeComponent();

            NavigationService.NavigateAsync("NavigationPage/MainPage");
        }

        protected override void RegisterTypes()
        {
            Container.RegisterTypeForNavigation<NavigationPage>();
            Container.RegisterTypeForNavigation<MainPage>();
            Container.RegisterTypeForNavigation<NavigatingAwareTabbedPage>();
            Container.RegisterTypeForNavigation<ViewA>();
            Container.RegisterTypeForNavigation<ViewB>();
            Container.RegisterTypeForNavigation<ViewC>();
        }
    }
}

