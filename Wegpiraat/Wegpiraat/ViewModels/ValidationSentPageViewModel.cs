using Prism.Commands;
using Prism.Mvvm;
using Prism.Navigation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wegpiraat.ViewModels
{
    public class ValidationSentPageViewModel : BindableBase, INavigationAware
    {
        public DelegateCommand<string> LoginCommand => new DelegateCommand<string>(async (path) => await OnLoginCommandExecuted(path));

        private INavigationService _navigationService;

        public ValidationSentPageViewModel(INavigationService navService)
        {
            _navigationService = navService;
        }

        private string _validationMessage;
        public string ValidationMessage
        {
            get { return _validationMessage; }
            set { SetProperty(ref _validationMessage, value); }
        }

        public void OnNavigatedFrom(NavigationParameters parameters)
        {
        }

        public void OnNavigatedTo(NavigationParameters parameters)
        {
        }

        public void OnNavigatingTo(NavigationParameters parameters)
        {
            var param = parameters.GetValue<string>("validationMessage");
            ValidationMessage = param;
        }

        private async Task OnLoginCommandExecuted(string path)
        {
            await _navigationService.NavigateAsync(path);
        }
    }
}
