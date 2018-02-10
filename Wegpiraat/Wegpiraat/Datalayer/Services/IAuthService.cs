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
        Task<User> Login(User userTryingToLogin);
        Task<bool> AccessTokenHasExpired(User user);
        Task<User> RefreshAccessToken(User user);
        Task<bool> RefreshTokenHasExpired(User user);
    }
}
