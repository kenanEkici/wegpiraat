using System;
using Prism.Events;

namespace Wegpiraat.ViewModels
{
    public class SearchPageViewModel : ChildViewModelBase
    {
        public SearchPageViewModel(IEventAggregator ea ) : base(ea)
        {
            Title = "Zoeken";
        }
    }
}
