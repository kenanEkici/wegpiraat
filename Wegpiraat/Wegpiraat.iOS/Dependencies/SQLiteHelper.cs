using SQLite.Net;
using SQLite.Net.Platform.XamarinIOS;
using System;
using System.IO;
using Wegpiraat.Datalayer.Repositories;
using Wegpiraat.iOS.Dependencies;
using Xamarin.Forms;

[assembly: Dependency(typeof(SQLiteHelper))]
namespace Wegpiraat.iOS.Dependencies
{
    public class SQLiteHelper : ISQLiteHelper
    {
        public SQLiteConnection GetConnection()
        {
            var sqliteFilename = "Wegpiraat.db3";
            string documentsPath = Environment.GetFolderPath(Environment.SpecialFolder.Personal); // Documents folder
            string libraryPath = Path.Combine(documentsPath, "..", "Library"); // Library folder
            var path = Path.Combine(libraryPath, sqliteFilename);
            var platform = new SQLitePlatformIOS();
            var connection = new SQLiteConnection(platform, path);
            return connection;
        }        
    }
}