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

        public async Task<string> GetStats(UniversalId universalId)
        {
            if (!universalId.IsValid)
                return "";


            string speaker = "";
            if (!string.IsNullOrWhiteSpace(universalId.WikiId))
            {
                speaker = $"wikidataId: \\\"{universalId.WikiId}\\\"";
            }
            else if (!string.IsNullOrWhiteSpace(universalId.OsobaId))
            {
                speaker = $"osobaId: \\\"{universalId.OsobaId}\\\"";
            }

            var query = $"{{ \"query\": \"{{ speakers({speaker}) {{ id, firstName, lastName, stats {{ misleading, true, untrue, unverifiable }} }} }}\" }}";
            HttpContent content = new StringContent(query, Encoding.UTF8, MediaTypeNames.Application.Json);
            var response = await _httpClient.PostAsync("", content);
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsStringAsync();
                return result;
            }
            throw new HttpRequestException($"Demagog responded with statusCode=[{response.StatusCode}].");
        }

    }

    public class UniversalId
    {
        public string OsobaId { get; set; }
        public string WikiId { get; set; }

        public bool IsValid => !(string.IsNullOrWhiteSpace(OsobaId) 
            && string.IsNullOrWhiteSpace(WikiId));
    }
}
