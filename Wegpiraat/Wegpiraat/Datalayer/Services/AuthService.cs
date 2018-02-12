using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Wegpiraat.Data.Datalayer.Domain;
using Wegpiraat.Datalayer.Repositories;

namespace Wegpiraat.Datalayer.Services
{
    public class AuthService : IAuthService
    {
        private HttpClient _httpClient;
        private IAuthRepository _authRepository;

        public AuthService()
        {
            _httpClient = new HttpClient { BaseAddress = new Uri(ApiConstants.BASE_API_URI) };
            _httpClient.DefaultRequestHeaders.Accept.Clear();
            _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            _authRepository = new AuthRepository();
        }

        //if login successful to server, save retrieved information in database
        //else retrieve error
        public async Task<User> Login(string username, string password)
        {
            var user = new User { Username = username, Password = password };
            var tokens = await RequestTokens(user) as Tokens;
            if (tokens != null)
            {
                _authRepository.AddNewUser(user);
                _authRepository.AddUserTokens(tokens);
                //_userRepository.UpdateUserInformation(RequestUserInformation(user));
                user.Tokens = _authRepository.GetSingleTokensOfUser();
                return await Task.FromResult(user);
            }
            return await Task.FromResult<User>(null);
        }

        //check if there's a user in the database
        //check if access_token has not expired? 
        //if not continue with application else try to refresh token
        //if database empty or unsuccessful, request login
        public async Task<User> AuthorizedUserExistsInDatabase()
        {           
            throw new NotImplementedException();
        }

        //request access token and refresh token with given credentials
        //return user with its tokens
        public async Task<Tokens> RequestTokens(User userTryingToLogin)
        {
            HttpResponseMessage resp;
            Tokens tokens;

            try
            {
                var nvc = new List<KeyValuePair<string, string>>
                {
                    new KeyValuePair<string, string>("grant_type", ApiConstants.PASSWORD_GRANT_TYPE),
                    new KeyValuePair<string, string>("client_id", ApiConstants.CLIENT_ID),
                    new KeyValuePair<string, string>("client_secret", ApiConstants.CLIENT_SECRET),
                    new KeyValuePair<string, string>("username", userTryingToLogin.Username),
                    new KeyValuePair<string, string>("password", userTryingToLogin.Password)
                };
                //_httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(Encoding.UTF8.GetBytes(username+ ":" +password)));
                resp = await _httpClient.PostAsync(ApiConstants.BASE_API_URI + "login", new FormUrlEncodedContent(nvc));
                tokens = JsonConvert.DeserializeObject<Tokens>(await resp.Content.ReadAsStringAsync());

                if (resp != null && resp.IsSuccessStatusCode)
                {
                    return await Task.FromResult(tokens);
                }

                //response is faulty, request login
                return await Task.FromResult<Tokens>(null);
            }
            catch (HttpRequestException ex)
            {
                //an error occured trying to login 
                //request login screen
                Debug.WriteLine(ex);
                return await Task.FromResult<Tokens>(null);
            }
        }

        //check if access token in database has expired
        //return true if expired
        //return false if not
        public async Task<bool> AccessTokenHasExpired(User user)
        {            
            throw new NotImplementedException();
        }

        //request a new access token with refresh token
        //replace access token with new in database 
        public async Task<bool> RefreshAccessToken(User user)
        {
            HttpResponseMessage resp;
            Tokens tokens;

            try
            {
                var nvc = new List<KeyValuePair<string, string>>
                {
                    new KeyValuePair<string, string>("grant_type", ApiConstants.REFRESH_GRANT_TYPE),
                    new KeyValuePair<string, string>("refresh_token", user.Tokens.RefreshToken),
                    new KeyValuePair<string, string>("client_id", ApiConstants.CLIENT_ID),
                    new KeyValuePair<string, string>("client_secret", ApiConstants.CLIENT_SECRET)
                };

                resp = await _httpClient.PostAsync(ApiConstants.BASE_API_URI + "login", new FormUrlEncodedContent(nvc));
                tokens = JsonConvert.DeserializeObject<Tokens>(await resp.Content.ReadAsStringAsync());

                if (resp != null && resp.IsSuccessStatusCode)
                {
                    //replace access token and refresh token in database
                    return await Task.FromResult<bool>(true);
                }

                //response is faulty
                return await Task.FromResult<bool>(false);
            }
            catch (HttpRequestException ex)
            {
                //an error occured trying to login 
                //request login screen
                Debug.WriteLine(ex);
                return await Task.FromResult<bool>(false);
            }
        }

        //a more complicated process
        //todo with email verification and such
        public Task<User> Register(User registeringUser)
        {            
            throw new NotImplementedException();
        }

        //send a email to client and all that beautiful stuff
        //a big todo
        public Task<bool> RequestEmailValidation(User user)
        {
            throw new NotImplementedException();
        }

        //some dumbfuck forgot his password
        //a big todo
        public Task<bool> RequestPasswordReset(User user)
        {
            throw new NotImplementedException();
        }

        //get user information after authentication
        //todo
        public Task<User> RequestUserInformation(User user)
        {
            throw new NotImplementedException();
        }
    }
}
