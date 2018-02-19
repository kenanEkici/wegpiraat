using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wegpiraat.Datalayer.Domain;

namespace Wegpiraat.Datalayer.Services
{
    public interface IWegpiraatService
    {
        Task<List<Wegpiraten>> GetAllWegpiraten();
        Task<Wegpiraten> GetWegpiraatById(Wegpiraten wegpiraat);
        Task<Wegpiraten> UploadWegpiraat(Wegpiraten wegpiraat);      
    }
}
