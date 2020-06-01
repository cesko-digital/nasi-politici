using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;

namespace HlidacStatu.NasiPolitici.Services
{
    public class MailService : IMailService
    {
        private readonly HttpClient _httpClient;

        private const string From = "martin.wenisch@cesko.digital";
        private const string To = "martin.wenisch@cesko.digital";

        public MailService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> SendMail(string text, string subject)
        {
            var emailData = new List<KeyValuePair<string, string>>
            {
                { new KeyValuePair<string, string>("from", From) },
                { new KeyValuePair<string, string>("to", To) },
                { new KeyValuePair<string, string>("subject", subject) },
                { new KeyValuePair<string, string>("text", text) }
            };

            var content = new FormUrlEncodedContent(emailData);
            var response = await _httpClient.PostAsync("messages", content);

            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsStringAsync();
                return result;
            }

            return "error occured while sending email";
        }
    }
}
