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
    public class UploadWegpiraatPageViewModel : BindableBase
    {
        private INavigationService _navigationService;
        private IWegpiraatService _wegpiraatService;

        #region properties

        public DelegateCommand<string> UploadCommand => new DelegateCommand<string>(async (path) => await OnUploadCommandExecuted(path));

        private string _error;
        public string Error
        {
            get { return _error; }
            set { SetProperty(ref _error, value); }
        }
        
        private string _title;
        public string Title
        {
            get { return _title; }
            set { SetProperty(ref _title, value); }
        }

        private string _description;
        public string Description
        {
            get { return _description; }
            set { SetProperty(ref _description, value); }
        }

        private DateTime _createdAt;
        public DateTime CreatedAt
        {
            get { return _createdAt; }
            set { SetProperty(ref _createdAt, value); }
        }

        #endregion

        #region ctor
        public UploadWegpiraatPageViewModel(INavigationService navService)
        {
            _navigationService = navService;
            _wegpiraatService = new WegpiraatService();
        }
        #endregion ctor

        private async Task OnUploadCommandExecuted(string path)
        {
            Wegpiraten wegpiraat = new Wegpiraten()
            {
                Title = Title,
                Description = Description,
                CreatedAt = DateTime.Now
            };
            var newWegpiraat = await _wegpiraatService.UploadWegpiraat(wegpiraat);
            if (newWegpiraat == null)
            {
                Error = "There has been an error";
            }            
            else
            {
                var param = new NavigationParameters();
                param.Add("post", newWegpiraat);
                await _navigationService.NavigateAsync(path, param);
            }            
        }
    }
}
