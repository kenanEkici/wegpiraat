using System;
using Prism.Events;
using Wegpiraat.Datalayer.Services;
using Wegpiraat.Data.Datalayer.Domain;
using System.Threading.Tasks;
using Prism.Navigation;
using Prism;

namespace Wegpiraat.ViewModels
{
    public class ProfilePageViewModel : ChildViewModelBase, IActiveAware
    {
        private IAuthService _authService;
        public event EventHandler IsActiveChanged;

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

        public ProfilePageViewModel(IEventAggregator ea ) : base(ea)
        {
            Title = "Profile";
            _authService = new AuthService();
        }

        public async void RequestUser()
        {
            User = await _authService.RequestUserInformation();
        }

    }
}
