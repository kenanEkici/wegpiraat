using System;
using Prism.Events;
using Wegpiraat.Datalayer.Services;

namespace Wegpiraat.ViewModels
{
    public class ViewAViewModel : ChildViewModelBase
    {
        public ViewAViewModel(IEventAggregator ea ) : base(ea)
        {
            Title = "View A";
        }
    }
}
