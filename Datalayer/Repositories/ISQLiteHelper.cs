using SQLite.Net;
using SQLite.Net.Interop;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wegpiraat.Datalayer.Repositories
{
    public interface ISQLiteHelper
    {
        //Gets the platform dependent connection
        SQLiteConnection GetConnection();
    }
}
