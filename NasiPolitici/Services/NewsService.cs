using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;

namespace HlidacStatu.NasiPolitici.Services
{
    public class NewsService : INewsService
    {
        private readonly HttpClient _httpClient;
        private readonly string _authenticationToken;

        public NewsService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _authenticationToken = configuration["CzFinToken"];
        }

        public async Task<string> LatestNews(string text)
        {
            var uri = $"action=get-latest-news/token={_authenticationToken}/keyword={HttpUtility.UrlEncode(text)}";
            var result = await _httpClient.GetStringAsync(uri);
            return result;
        }

    }
}
