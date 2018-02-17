using Prism;
using Prism.Events;
using Prism.Navigation;
using Wegpiraat.Events;
using System;

namespace Wegpiraat.ViewModels
{
    public class ChildViewModelBase : BaseViewModel, IDestructible
    {
        IEventAggregator _ea { get; }
        public ChildViewModelBase(IEventAggregator eventAggregator)
        {
            _ea = eventAggregator;            
        }
    }
}
