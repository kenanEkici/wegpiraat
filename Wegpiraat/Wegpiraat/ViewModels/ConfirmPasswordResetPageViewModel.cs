using Prism.Commands;
using Prism.Mvvm;
using Prism.Navigation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wegpiraat.Data.Datalayer.Domain;
using Wegpiraat.Datalayer.Services;

namespace Wegpiraat.ViewModels
{
    public class ConfirmPasswordResetPageViewModel : BindableBase, INavigationAware
    {
        private INavigationService _navigationService;
        private IAuthService _authService;
        public DelegateCommand<string> ResetPasswordCommand => new DelegateCommand<string>(async (path) => await OnResetPasswordCommandExecuted(path));    
        public DelegateCommand<string> LoginCommand => new DelegateCommand<string>(async (path) => await OnLoginCommandExecuted(path));

        public ConfirmPasswordResetPageViewModel(INavigationService navService)
        {
            _navigationService = navService;
            _authService = new AuthService();
        }

        private string _email;
        public string Email
        {
            get { return _email; }
            set { SetProperty(ref _email, value); }
        }

        private string _notification;
        public string Notification
        {
            get { return _notification; }
            set { SetProperty(ref _notification, value); }
        }

        private string _token;
        public string Token
        {
            get { return _token; }
            set { SetProperty(ref _token, value); }
        }

        private string _password;
        public string Password
        {
            get { return _password; }
            set { SetProperty(ref _password, value); }
        }

        private string _confirmPassword;
        public string ConfirmPassword
        {
            get { return _confirmPassword; }
            set { SetProperty(ref _confirmPassword, value); }
        }

        public void OnNavigatedFrom(NavigationParameters parameters) { }

        public void OnNavigatedTo(NavigationParameters parameters) { }

        public void OnNavigatingTo(NavigationParameters parameters)
        {
            Email = parameters.GetValue<string>("email");
            Notification =  parameters.GetValue<string>("notification");
        }

        private async Task OnResetPasswordCommandExecuted(string path)
        {
            var resp = await _authService.ResetPassword(new User() { Email = Email, Token = Token, Password = Password, ConfirmPassword = ConfirmPassword});
            if (resp)
            {
                await _navigationService.NavigateAsync(path);
            }
            else
            {
                Notification = "An error occured";
            }
        }

        private async Task OnLoginCommandExecuted(string path)
        {
            await _navigationService.NavigateAsync(path);
        }
    }
}
