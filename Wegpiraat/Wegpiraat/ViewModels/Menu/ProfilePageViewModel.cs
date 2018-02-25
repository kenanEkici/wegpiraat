using System;
using Prism.Events;
using Wegpiraat.Datalayer.Services;
using System.Threading.Tasks;
using Prism.Navigation;
using Prism;
using Prism.Commands;
using Wegpiraat.Datalayer.Domain;

namespace Wegpiraat.ViewModels
{
    public class ProfilePageViewModel : ChildViewModelBase, IActiveAware
    {
        private IAuthService _authService;
        private INavigationService _navigationService;
        public event EventHandler IsActiveChanged;
        public DelegateCommand<string> LogoutCommand => new DelegateCommand<string>(async (path) => await OnLogoutCommandExecuted(path));

        private User _user = new User();
        public User User
        {
            get => _user;
            set
            {
                _user = value;
                RaisePropertyChanged(nameof(User));
            }
        }

        private bool _isActive;
        public bool IsActive
        {
            get => _isActive;
            set { _isActive = value; if (value) RequestUser(); }
        }

        public ProfilePageViewModel(IEventAggregator ea, INavigationService navService ) : base(ea)
        {
            Title = "Profile";
            _navigationService = navService;
            _authService = new AuthService();
        }

        public async void RequestUser()
        {
            User = await _authService.RequestUserInformation();
        }

        private async Task OnLogoutCommandExecuted(string path)
        {
            _authService.Logout();
            await _navigationService.NavigateAsync(path);            
        }

    }
}
