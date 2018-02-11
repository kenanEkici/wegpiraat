using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Wegpiraat.Data.Datalayer.Domain;

namespace Wegpiraat.Datalayer.Services
{
    public class AuthService : IAuthService
    {
        private HttpClient _httpClient;

        public AuthService()
        {
            _httpClient = new HttpClient { BaseAddress = new Uri(ApiConstants.BASE_API_URI) };
            _httpClient.DefaultRequestHeaders.Accept.Clear();
            _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        public async Task<User> Login(User userTryingToLogin)
        {
            HttpResponseMessage resp;
            Tokens tokens;

            try
            {
                var nvc = new List<KeyValuePair<string, string>>();
                nvc.Add(new KeyValuePair<string, string>("grant_type", ApiConstants.GRANT_TYPE));
                nvc.Add(new KeyValuePair<string, string>("client_id", ApiConstants.CLIENT_ID));
                nvc.Add(new KeyValuePair<string, string>("client_secret", ApiConstants.CLIENT_SECRET));
                nvc.Add(new KeyValuePair<string, string>("username", userTryingToLogin.Username));
                nvc.Add(new KeyValuePair<string, string>("password", userTryingToLogin.Password));
                //_httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(Encoding.UTF8.GetBytes(username+ ":" +password)));
                string kek = ApiConstants.BASE_API_URI + "login";
                resp = await _httpClient.PostAsync(kek, new FormUrlEncodedContent(nvc));
                tokens = JsonConvert.DeserializeObject<Tokens>(await resp.Content.ReadAsStringAsync());

                if (resp != null && resp.IsSuccessStatusCode)
                {
                    //store user with it's tokens in the database
                    return await Task.FromResult(new User { Tokens = tokens, Username = userTryingToLogin.Username, Password = userTryingToLogin.Password });
                }

                return await Task.FromResult<User>(null);
            }
            catch (HttpRequestException ex)
            {
                Debug.WriteLine(ex);
                return await Task.FromResult<User>(null);
            }
        }

        public Task<bool> AccessTokenHasExpired(User user)
        {
            throw new NotImplementedException();
        }

        public Task<User> RefreshAccessToken(User user)
        {
            throw new NotImplementedException();
        }

        public Task<bool> RefreshTokenHasExpired(User user)
        {
            throw new NotImplementedException();
        }
    }
}
