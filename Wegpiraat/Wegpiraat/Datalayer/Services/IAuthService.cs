using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wegpiraat.Data.Datalayer.Domain;

namespace Wegpiraat.Datalayer.Services
{
    public interface IAuthService
    {
        Task<User> Register(User registeringUser);
        Task<User> Login(string username, string password);
        Task<User> RequestUserInformation(User user);
        Task<Tokens> RequestTokens(User user);
        Task<User> AuthorizedUserExistsInDatabase();
        Task<bool> AccessTokenHasExpired(User user);
        Task<bool> RefreshAccessToken(User user);
        Task<bool> RequestEmailValidation(User user);
        Task<bool> RequestPasswordReset(User user);
    }
}
