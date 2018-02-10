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
                //_httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(Encoding.UTF8.GetBytes(username+ ":" +password)));
                resp = await _httpClient.PostAsync(ApiConstants.BASE_API_URI + "/login", new StringContent(JsonConvert.SerializeObject(userTryingToLogin), Encoding.UTF8, "application/json"));
                tokens = JsonConvert.DeserializeObject<Tokens>(await resp.Content.ReadAsStringAsync());

                if (resp != null && resp.IsSuccessStatusCode)
                {
                    //store user with it's tokens in the database
                    return new User { Tokens = tokens, Username = userTryingToLogin.Username, Password = userTryingToLogin.Password };
                }

                return null;
            }
            catch (HttpRequestException ex)
            {
                Debug.WriteLine("server error fam");
                return null;
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
