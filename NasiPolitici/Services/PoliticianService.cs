using System.Net.Http;
using System.Threading.Tasks;
using System.Web;

namespace HlidacStatu.NasiPolitici.Services
{
    public class PoliticianService : IPoliticianService
    {
        private readonly HttpClient _httpClient;

        public PoliticianService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> SearchPeople(string text)
        {
            var uri = $"nasipolitici_find?query={HttpUtility.UrlEncode(text)}";
            var result = await _httpClient.GetStringAsync(uri);
            return result;
        }

        public async Task<string> GetPerson(string id)
        {
            var uri = $"nasipolitici_getdata?id={HttpUtility.UrlEncode(id)}";
            var result = await _httpClient.GetStringAsync(uri);
            return result;
        }
    }
}
