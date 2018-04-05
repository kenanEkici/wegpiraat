using Prism.Commands;
using Prism.Navigation;
using System;
using System.Collections.Generic;
using Xamarin.Forms;
using System.Threading.Tasks;

namespace Wegpiraat.ViewModels
{
    public class MenuPageViewModel : BaseViewModel
    {
        private INavigationService _navigationService;
        public DelegateCommand<string> UploadCommand => new DelegateCommand<string>(async (path) => await OnUploadCommandExecuted(path));

        public MenuPageViewModel(INavigationService navService)
        {
            _navigationService = navService;
        }

        private async Task OnUploadCommandExecuted(string path)
        {
            await _navigationService.NavigateAsync(path);
        }        
    }
}
