using System;
using Prism.Events;

namespace Wegpiraat.ViewModels
{
    public class ProfilePageViewModel : ChildViewModelBase
    {
        public ProfilePageViewModel(IEventAggregator ea ) : base(ea)
        {
            Title = "Profiel";
        }
    }
}
