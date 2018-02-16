using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wegpiraat.Data.Datalayer.Domain;

namespace Wegpiraat.Datalayer.Repositories
{
    public interface IAuthRepository
    {
        User GetSingleUser();
        bool AddNewUser(User user);
        bool AddUserTokens(Tokens tokens);
        Tokens GetSingleTokensOfUser();
        bool UpdateUserInformation(User user);
    }
}
