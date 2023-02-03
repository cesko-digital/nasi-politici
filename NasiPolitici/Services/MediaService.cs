using System.Net.Http;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Services
{
    public class MediaService : IMediaService
    {
        private readonly HttpClient _httpClient;

        public MediaService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> GetArticles(string json)
        {

            HttpContent content = new StringContent(json, Encoding.UTF8, MediaTypeNames.Application.Json);
            var response = await _httpClient.PostAsync("articles", content);
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsStringAsync();
                return result;
            }
            throw new HttpRequestException($"Media responded with statusCode=[{response.StatusCode}].");
        }

    }
}
