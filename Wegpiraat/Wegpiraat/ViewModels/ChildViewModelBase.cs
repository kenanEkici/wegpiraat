using Prism;
using Prism.Events;
using Prism.Navigation;
using Wegpiraat.Events;
using System;

namespace Wegpiraat.ViewModels
{
    public class ChildViewModelBase : BaseViewModel, IActiveAware, INavigatingAware, IDestructible
    {
        IEventAggregator _ea { get; }
        public ChildViewModelBase( IEventAggregator eventAggregator )
        {
            _ea = eventAggregator;           
        }

        public event EventHandler IsActiveChanged;

        private string _message;
        public string Message
        {
            get { return _message; }
            set { SetProperty(ref _message, value); }
        }

        private bool _isActive;
        public bool IsActive
        {
            get { return _isActive; }
            set { SetProperty(ref _isActive, value); }
        }
    }
}
