using System.Threading.Tasks;
using Wegpiraat.Datalayer.Domain;

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
        Task<bool> ResetPassword(User user);
        Task<string> RequestPasswordReset(User user);
        Task<bool> HasApiConnection();
        void Logout();
    }
}
