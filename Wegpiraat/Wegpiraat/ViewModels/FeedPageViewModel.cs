using System;
using Prism.Events;
using Wegpiraat.Datalayer.Services;

namespace Wegpiraat.ViewModels
{
    public class FeedPageViewModel : ChildViewModelBase
    {
        public FeedPageViewModel(IEventAggregator ea ) : base(ea)
        {
            Title = "Wegpiraten";
        }
    }
}
