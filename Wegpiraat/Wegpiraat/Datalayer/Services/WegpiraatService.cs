using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Wegpiraat.Datalayer.Domain;
using Wegpiraat.Datalayer.Repositories;

namespace Wegpiraat.Datalayer.Services
{
    public class WegpiraatService : IWegpiraatService
    {
        private HttpClient _httpClient;
        private IAuthRepository _authRepository;

        public WegpiraatService()
        {
            _httpClient = new HttpClient { BaseAddress = new Uri(ApiConstants.BASE_API_URI) };
            _httpClient.DefaultRequestHeaders.Accept.Clear();
            _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            _authRepository = new AuthRepository();
        }

        public async Task<List<Wegpiraten>> GetAllWegpiraten()
        {
            var aToken = _authRepository.GetSingleTokensOfUser();
            try
            {
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", aToken.AccessToken);
                var resp = await _httpClient.GetAsync(ApiConstants.BASE_API_URI + "wegpiraten");               
                if (resp != null && resp.IsSuccessStatusCode)
                {
                    return JsonConvert.DeserializeObject<List<Wegpiraten>>(await resp.Content.ReadAsStringAsync());
                }
                return null;
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                return null;
            }
        }

        public async Task<Wegpiraten> GetWegpiraatById(Wegpiraten wegpiraat)
        {
            var aToken = _authRepository.GetSingleTokensOfUser();
            try
            {
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", aToken.AccessToken);
                var resp = await _httpClient.GetAsync(ApiConstants.BASE_API_URI + "wegpiraten/"+wegpiraat.Id);
                if (resp != null && resp.IsSuccessStatusCode)
                {
                    return JsonConvert.DeserializeObject<Wegpiraten>(await resp.Content.ReadAsStringAsync());
                }
                return null;
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                return null;
            }
        }

        public async Task<Like> LikeWegpiraat(string id)
        {
            var aToken = _authRepository.GetSingleTokensOfUser();
            try
            {
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", aToken.AccessToken);
                var resp = await _httpClient.PostAsync(ApiConstants.BASE_API_URI + "wegpiraten/"+id+"/like", null);
                if (resp != null && resp.IsSuccessStatusCode)
                {
                    return JsonConvert.DeserializeObject<Like>(await resp.Content.ReadAsStringAsync());
                }
                return null;
            }
            catch (HttpRequestException ex)
            {
                Debug.WriteLine(ex);
                return null;
            }
        }

        public async Task<Wegpiraten> UploadWegpiraat(Wegpiraten wegpiraat)
        {
            var aToken = _authRepository.GetSingleTokensOfUser();
            try
            {
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", aToken.AccessToken);
                var resp = await _httpClient.PostAsync(ApiConstants.BASE_API_URI + "wegpiraten", new StringContent(JsonConvert.SerializeObject(wegpiraat), Encoding.UTF8, "application/json"));
                if (resp != null && resp.IsSuccessStatusCode)
                {
                    return JsonConvert.DeserializeObject<Wegpiraten>(await resp.Content.ReadAsStringAsync());
                }                
                return null;
            }
            catch (HttpRequestException ex)
            {
                Debug.WriteLine(ex);
                return null;
            }
        }
    }
}
