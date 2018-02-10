using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Wegpiraat.Datalayer.Services
{
    public class WegpiraatService : IWegpiraatService
    {
        private HttpClient _httpClient;

        public WegpiraatService()
        {
            _httpClient = new HttpClient { BaseAddress = new Uri(ApiConstants.BASE_API_URI) };
            _httpClient.DefaultRequestHeaders.Accept.Clear();
            _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            //_httpClient.DefaultRequestHeaders.Authorization = AuthService.ReturnAuthHeader(UserRepository.GetActiveUser());
        }

        //public async Task<bool> AddEvent(Event newEvent)
        //{
        //    var resp = await _httpClient.PostAsync("/events", new StringContent(JsonConvert.SerializeObject(newEvent), Encoding.UTF8, "application/json"));
        //    return resp.IsSuccessStatusCode;
        //}

        //public async Task<Event> UpdateEvent(Event updatedEvent)
        //{
        //    var resp = await _httpClient.PutAsync("/events/" + updatedEvent.Id, new StringContent(JsonConvert.SerializeObject(updatedEvent), Encoding.UTF8, "application/json"));
        //    return JsonConvert.DeserializeObject<Event>(await resp.Content.ReadAsStringAsync());
        //}

        //public async Task<bool> DeleteEvent(int eventId)
        //{
        //    var resp = await _httpClient.DeleteAsync("/events/" + eventId);
        //    return resp.IsSuccessStatusCode;
        //}

        //public async Task<ICollection<Event>> GetAllMyEvents()
        //{
        //    var resp = await _httpClient.GetAsync("/events/mine/" + UserRepository.GetActiveUser().CardNumber);
        //    string response = await resp.Content.ReadAsStringAsync();
        //    return JsonConvert.DeserializeObject<List<Event>>(response);
        //}

        //public async Task<ICollection<Event>> GetAllEvents()
        //{
        //    var resp = await _httpClient.GetAsync("/events");
        //    return JsonConvert.DeserializeObject<List<Event>>(await resp.Content.ReadAsStringAsync());
        //}

        //public async Task<ICollection<User>> ScanParticipant(int eventId, string cardNumber)
        //{
        //    var resp = await _httpClient.PostAsync("/events/" + eventId + "/" + cardNumber + "/scan", null);
        //    return JsonConvert.DeserializeObject<List<User>>(await resp.Content.ReadAsStringAsync());
        //}

        //public async Task<ICollection<User>> GetParticipantsOfEvent(int eventId)
        //{
        //    var resp = await _httpClient.GetAsync("/events/" + eventId + "/participants");
        //    return JsonConvert.DeserializeObject<List<User>>(await resp.Content.ReadAsStringAsync());
        //}

        //public async Task<ICollection<Event>> GetAllParticipationRequiredEvents()
        //{
        //    var resp = await _httpClient.GetAsync("/events/required/" + UserRepository.GetActiveUser().CardNumber);
        //    return JsonConvert.DeserializeObject<List<Event>>(await resp.Content.ReadAsStringAsync());
        //}

        //public async Task<bool> RegisterParticipation(int eventId)
        //{
        //    var resp = await _httpClient.PostAsync("/events/" + eventId, null);
        //    return resp.IsSuccessStatusCode;
        //}
    }
}
