using System;
using Prism.Events;

namespace Wegpiraat.ViewModels
{
    public class ViewCViewModel : ChildViewModelBase
    {
        public ViewCViewModel(IEventAggregator ea ) : base(ea)
        {
            Title = "View C";
        }
    }
}
