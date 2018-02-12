using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Wegpiraat.Droid.Dependencies;
using Xamarin.Forms;
using Wegpiraat.Datalayer.Repositories;
using SQLite.Net;
using System.IO;

[assembly: Dependency(typeof(SQLiteHelper))]
namespace Wegpiraat.Droid.Dependencies
{
    public class SQLiteHelper : ISQLiteHelper
    {
        public SQLiteConnection GetConnection()
        {
            var sqliteFilename = "Wegpiraat.db3";
            string documentsPath = Environment.GetFolderPath(Environment.SpecialFolder.Personal); // Documents folder
            var path = Path.Combine(documentsPath, sqliteFilename);
            var platform = new SQLite.Net.Platform.XamarinAndroid.SQLitePlatformAndroid();
            var connection = new SQLiteConnection(platform, path);
            return connection;
        }
    }
}