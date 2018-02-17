using System.Threading.Tasks;
using Wegpiraat.Data.Datalayer.Domain;

namespace Wegpiraat.Datalayer.Services
{
    public interface IAuthService
    {
        Task<string> Register(User registeringUser);
        Task<User> Login(string username, string password);
        Task<bool> UserIsAuthorized();
        Task<User> RequestUserInformation();
        Task<Tokens> RequestTokens(User user);
        User AuthorizedUserExistsInDatabase();
        bool AccessTokenHasExpired();
        Task<bool> RefreshAccessToken(User user);
        Task<bool> ResendEmailValidation(User user);
        Task<bool> RequestPasswordReset(User user);
    }
}
