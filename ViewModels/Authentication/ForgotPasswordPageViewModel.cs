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

namespace Wegpiraat.ViewModels
{
    public class ForgotPasswordPageViewModel : BindableBase
    {

        private INavigationService _navigationService;
        private IAuthService _authService;

        public DelegateCommand<string> ResetCommand => new DelegateCommand<string>(async (path) => await OnResetCommandExecuted(path));
        public DelegateCommand<string> NonResetCommand => new DelegateCommand<string>(async (path) => await OnNonResetCommandExecuted(path));
        
        public ForgotPasswordPageViewModel(INavigationService navService)
        {
            _navigationService = navService;
            _authService = new AuthService();
        }

        private string _email = "kenan.ekici@outlook.com";
        public string Email
        {
            get { return _email; }
            set { SetProperty(ref _email, value); }
        }

        private async Task OnResetCommandExecuted(string path)
        {
            var email = await _authService.RequestPasswordReset(new User() { Email = Email });
            if (email == null)
            {
                //some errors probably 
            }
            else
            {
                var param = new NavigationParameters();
                param.Add("email", email);
                param.Add("notification", "A token to reset your password has been sent to " + email);
                await _navigationService.NavigateAsync(path, param);
            }
        }

        private async Task OnNonResetCommandExecuted(string path)
        {
            await _navigationService.NavigateAsync(path);
        }

    }
}
