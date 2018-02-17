using Prism.Commands;
using Prism.Mvvm;
using Prism.Navigation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wegpiraat.Data.Datalayer.Domain;
using Wegpiraat.Datalayer.Services;

namespace Wegpiraat.ViewModels
{
    public class LoginPageViewModel : BindableBase
    {
        INavigationService _navigationService { get; }
        IAuthService _authService { get; }

        public DelegateCommand<string> LoginCommand => new DelegateCommand<string>(async (path) => await OnLoginCommandExecuted(path));
        
        public DelegateCommand<string> RegisterCommand => new DelegateCommand<string>(async (path) => await OnRegisterCommandExecuted(path));

        public DelegateCommand<string> ForgotPasswordCommand => new DelegateCommand<string>(async (path) => await OnForgotPasswordCommandExecuted(path));

        private string _username = "example@outlook.com";
        public string Username
        {
            get { return _username; }
            set { SetProperty(ref _username, value); }
        }

        private string _password = "example123";
        public string Password
        {
            get { return _password; }
            set { SetProperty(ref _password, value); }
        }

        private string _loginError;
        public string LoginError
        {
            get { return _loginError; }
            set { SetProperty(ref _loginError, value); }
        }

        private string _spinner;
        public string Spinner
        {
            get { return _spinner; }
            set { SetProperty(ref _spinner, value); }
        }

        public LoginPageViewModel(INavigationService navigationService)
        {
            _navigationService = navigationService;
            _authService = new AuthService();
        }        

        private async Task OnLoginCommandExecuted(string path)
        {
            //show spinner
            var user = await _authService.Login(Username, Password);
            //hide spinner

            if (user != null)
            {
                await _navigationService.NavigateAsync(path);
            }
            else
            {
                ThrowLoginError();
                await Task.Delay(3000);
                EmptyLoginError();
            }
        }

        private async Task OnForgotPasswordCommandExecuted(string path) => await _navigationService.NavigateAsync(path);

        private async Task OnRegisterCommandExecuted(string path) => await _navigationService.NavigateAsync(path);

        private void ThrowLoginError() => LoginError = "Username or password is incorrect, please try again.";        

        private void EmptyLoginError() => LoginError = "";
        
    }
}

