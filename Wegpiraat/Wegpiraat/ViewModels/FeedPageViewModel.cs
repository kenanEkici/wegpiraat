using System;
using Prism.Events;
using Wegpiraat.Datalayer.Services;
using Prism.Navigation;
using System.Collections.Generic;
using System.Threading.Tasks;
using Wegpiraat.Datalayer.Domain;
using Wegpiraat.Converters;
using System.Collections.ObjectModel;

namespace Wegpiraat.ViewModels
{
    public class FeedPageViewModel : ChildViewModelBase
    {
        private IWegpiraatService _wegpiraatService;

        private ObservableCollection<Wegpiraten> _wegpiraten;
        public ObservableCollection<Wegpiraten> Wegpiraten
        {
            get { return _wegpiraten; }
            set { SetProperty(ref _wegpiraten, value); }
        }

        public FeedPageViewModel(IEventAggregator ea ) : base(ea)
        {
            Title = "Wegpiraten";
            _wegpiraatService = new WegpiraatService();
            GetData();
        }

        public async void GetData()
        {
            Wegpiraten = ExtensionHelper.ToObservableCollection(await _wegpiraatService.GetAllWegpiraten());
        }
    }
}
