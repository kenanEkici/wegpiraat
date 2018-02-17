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
    public class RegisterPageViewModel : BindableBase, INavigatedAware
    {
        INavigationService _navigationService { get; }
        IAuthService _authService { get; }

        public DelegateCommand<string> RegisterCommand => new DelegateCommand<string>(async (path) => await OnRegisterCommandExecuted(path));

        public RegisterPageViewModel(INavigationService navService)
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

        private string _username = "kenan123";
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

        private string _confirmPassword = "example123";
        public string ConfirmPassword
        {
            get { return _confirmPassword; }
            set { SetProperty(ref _confirmPassword, value); }
        }

        private string _firstName = "kenan";
        public string FirstName
        {
            get { return _firstName; }
            set { SetProperty(ref _firstName, value); }
        }

        private string _lastName = "ekici";
        public string LastName
        {
            get { return _lastName; }
            set { SetProperty(ref _lastName, value); }
        }

        private string _registerError;
        public string RegisterError
        {
            get { return _registerError; }
            set { SetProperty(ref _registerError, value); }
        }

        private string _spinner;
        public string Spinner
        {
            get { return _spinner; }
            set { SetProperty(ref _spinner, value); }
        }

        private async Task OnRegisterCommandExecuted(string path)
        {
            var validationEmail = await TryRegister();            

            if (validationEmail == null)
            {
                //some errors probably 
            }
            else
            {
                var param = new NavigationParameters();
                param.Add("validationMessage", "Validation email has been sent to " + validationEmail);
                await _navigationService.NavigateAsync(path, param);
            }
        }

        private async Task<string> TryRegister()
        {
            var tempUser = new User
            {
                Email = Email,
                Username = Username,
                Password = Password,
                FirstName = FirstName,
                LastName = LastName
            };

            //send data to validation also double check password
            //show validation errors if any
            //return data if no errors
            //parse to service

            return await _authService.Register(tempUser);
        }

        public void OnNavigatedFrom(NavigationParameters parameters)
        {
        }

        public void OnNavigatedTo(NavigationParameters parameters)
        {
        }

    }
}
