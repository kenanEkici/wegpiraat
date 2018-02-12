using System.Threading.Tasks;
using Wegpiraat.Data.Datalayer.Domain;

namespace Wegpiraat.Datalayer.Services
{
    public interface IAuthService
    {
        Task<User> Register(User registeringUser);
        Task<User> Login(string username, string password);
        Task<bool> UserIsAuthorized();
        Task<User> RequestUserInformation(User user);
        Task<Tokens> RequestTokens(User user);
        User AuthorizedUserExistsInDatabase();
        bool AccessTokenHasExpired();
        Task<bool> RefreshAccessToken(User user);
        Task<bool> RequestEmailValidation(User user);
        Task<bool> RequestPasswordReset(User user);
    }
}
