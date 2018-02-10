using Prism.Commands;
using Prism.Mvvm;
using Prism.Navigation;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Wegpiraat.ViewModels
{
    public class MainPageViewModel : BindableBase
    {
        INavigationService _navigationService { get; }

        public MainPageViewModel(INavigationService navigationService)
        {
            _navigationService = navigationService;
            NavigateCommand = new DelegateCommand<string>(OnNavigateCommandExecuted);
        }

        private string _title;
        public string Title
        {
            get { return _title; }
            set { SetProperty(ref _title, value); }
        }        

        public DelegateCommand<string> NavigateCommand { get; }

        private void OnNavigateCommandExecuted(string path) =>
            _navigationService.NavigateAsync(path);
        
    }
}

