using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Services
{
    public class DemagogService : IDemagogService
    {
        private readonly HttpClient _httpClient;

        public DemagogService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> GetStats(string osobaId)
        {
            var query = $"{{ \"query\": \"{{ speakers(osobaId: \\\"{osobaId}\\\") {{ id, firstName, lastName, stats {{ misleading, true, untrue, unverifiable }} }} }}\" }}";
            HttpContent content = new StringContent(query, Encoding.UTF8, MediaTypeNames.Application.Json);
            var response = await _httpClient.PostAsync("", content);
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsStringAsync();
                return result;
            }
            return "";
        }

    }
}
