using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SQLite.Net;
using System.IO;
using Xamarin.Forms;
using System.Diagnostics;
using Wegpiraat.Datalayer.Domain;

namespace Wegpiraat.Datalayer.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private SQLiteConnection _connection;

        public AuthRepository()
        {
            _connection = DependencyService.Get<ISQLiteHelper>().GetConnection();
            //_connection.DropTable<User>();
            //_connection.DropTable<Tokens>();
            if (!_connection.GetTableInfo("User").Any()) _connection.CreateTable<User>();
            if (!_connection.GetTableInfo("Tokens").Any()) _connection.CreateTable<Tokens>();
        }

        public bool AddNewUser(User user)
        {
            _connection.DeleteAll(typeof(User));
            if (_connection.Insert(user) == 1)
                return true;            
            return false;
        }

        public bool AddUserTokens(Tokens tokens)
        {
            _connection.DeleteAll(typeof(Tokens));
            tokens.ExpireDate = DateTime.Now.AddSeconds(2*tokens.ExpiresAt);
            if (_connection.Insert(tokens) == 1)
                return true;
            return false;
        }

        public User GetSingleUser()
        {
            return _connection.Table<User>().FirstOrDefault();
        }

        public Tokens GetSingleTokensOfUser()
        {
            return _connection.Table<Tokens>().FirstOrDefault();
        }

        public bool UpdateUserInformation(User todo)
        {
            var user = GetSingleUser();
            user.FirstName = todo.FirstName;
            user.LastName = todo.LastName;
            if (_connection.Update(user) == 1)
                return true;
            return false;
        }

        public bool ClearDatabase()
        {
            try
            {
                _connection.DropTable<User>();
                _connection.DropTable<Tokens>();
                return true;
            }
            catch(Exception ex)
            {
                Debug.WriteLine(ex);
                return false;
            }
        }
    }
}
