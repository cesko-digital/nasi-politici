using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;

namespace HlidacStatu.NasiPolitici.Services
{
    public class PoliticianService : IPoliticianService
    {
        private readonly HttpClient _httpClient;
        private readonly IMemoryCache _cache;

        private readonly TimeSpan CacheDuration = TimeSpan.FromHours(12);
        private readonly string _peopleCacheKey = "_PeopleCacheKey";
        public PoliticianService(HttpClient httpClient, IMemoryCache cache)
        {
            _httpClient = httpClient;
            _cache = cache;
        }

        public async Task<string> SearchPeople(string text)
        {
            var people = await _cache.GetOrCreateAsync<IEnumerable<PersonDTO>>(_peopleCacheKey, entry =>
            {
                entry.SetAbsoluteExpiration(CacheDuration);
                return LoadPeople();
            });


            CompareInfo ci = new CultureInfo("").CompareInfo;
            CompareOptions co = CompareOptions.IgnoreCase | CompareOptions.IgnoreNonSpace;

            var wantedPersons =  people
                .Where(p =>
                    ci.IndexOf(p.asciiSurname, text, co) == 0
                    || ci.IndexOf(p.asciiName, text, co) == 0
                    || ci.IndexOf(p.asciiName + " " + p.asciiSurname, text, co) == 0
                    || ci.IndexOf(p.asciiSurname + " " + p.asciiName, text, co) == 0)
                .Select(p => new
                {
                    p.id,
                    p.name,
                    p.surname,
                    p.birthYear,
                    p.currentParty,
                    p.eventCount
                })
                .OrderByDescending( p => p.eventCount)
                .Take(50);
            return JsonConvert.SerializeObject(wantedPersons);
        }

        private async Task<IEnumerable<PersonDTO>> LoadPeople()
        {
            var uri = "nasipolitici_getlist";
            var response = await _httpClient.GetStringAsync(uri);
            var result = JsonConvert.DeserializeObject<List<PersonDTO>>(response);
            return result;
        }

        public async Task<string> GetPerson(string id)
        {
            var uri = $"nasipolitici_getdata?id={HttpUtility.UrlEncode(id)}";
            var result = await _httpClient.GetStringAsync(uri);
            return result;
        }

        class PersonDTO
        {
            public string id { get; set; }
            public string name { get; set; }
            public string surname { get; set; }
            public string asciiName { get; set; }
            public string asciiSurname { get; set; }
            public string birthYear { get; set; }
            public string currentParty { get; set; }
            public int? eventCount { get; set; }
        }
    }

}
