﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wegpiraat.Data.Datalayer.Domain;
using SQLite.Net;
using System.IO;
using Xamarin.Forms;

namespace Wegpiraat.Datalayer.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private SQLiteConnection _connection;

        public AuthRepository()
        {
            _connection = DependencyService.Get<ISQLiteHelper>().GetConnection();
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

        public bool UpdateTokens(Tokens todo)
        {
            var tokens = GetSingleTokensOfUser();
            tokens.AccessToken = todo.AccessToken;
            tokens.RefreshToken = todo.RefreshToken;
            tokens.ExpiresAt = todo.ExpiresAt;
            if (_connection.Update(tokens) == 1)
                return true;
            return false;
        }
    }
}
