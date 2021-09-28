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
    public class PoliticianServiceV2 : IPoliticianService
    {
        private readonly HttpClient _httpClient;
        private readonly IMemoryCache _cache;

        private readonly TimeSpan CacheDuration = TimeSpan.FromHours(2);
        private readonly string _peopleCacheKey = "_PeopleCacheKey";
        public PoliticianServiceV2(HttpClient httpClient, IMemoryCache cache)
        {
            _httpClient = httpClient;
            _cache = cache;
        }

        public async Task<string> SearchPeople(string text, string place, string function, string party)
        {
            var people = await GetCachedPeople();

            var peopleFiltered = people;

            if (!string.IsNullOrWhiteSpace(place))
            {
                peopleFiltered = peopleFiltered.Where(p => p.PoliticalFunctions.Any(f =>
                    f.Organisation?.Contains(place, StringComparison.InvariantCultureIgnoreCase) ?? false));
            }
            if (!string.IsNullOrWhiteSpace(function))
            {
                peopleFiltered = peopleFiltered.Where(p => p.PoliticalFunctions.Any(f =>
                    f.Name?.StartsWith(function, StringComparison.InvariantCultureIgnoreCase) ?? false));
            }
            if (!string.IsNullOrWhiteSpace(party))
            {
                peopleFiltered = peopleFiltered.Where(p => p.PoliticalFunctions.Any(f =>
                    f.Organisation?.StartsWith(party, StringComparison.InvariantCultureIgnoreCase) ?? false));
            }
            
            var peopleFilteredList = peopleFiltered.ToList();
                
                

            var wholeSearchAccented = peopleFilteredList
                .Where(p =>
                    p.ShortName.ToLower().StartsWith(text.ToLower())
                )
                .OrderByDescending(p => p.PoliticalFunctions.Length)
                .Take(50);

            var wholeSearch = peopleFilteredList
                .Where(p =>
                    p.ShortName.ToLower().RemoveAccents().StartsWith(text.ToLower().RemoveAccents())
                )
                .OrderByDescending(p => p.PoliticalFunctions.Length)
                .Take(50);

            var tokenAllSearch = peopleFilteredList
                .Where(p =>
                    text.ToLower().KeepLettersNumbersAndSpace().Split(" ").All(txt=> 
                        p.SearchTokens.Any(tok => tok.StartsWith(txt)))
                )
                .OrderByDescending(p => p.PoliticalFunctions.Length)
                .Take(50);

            var tokenAllSearchWithoutAccents = peopleFilteredList
                .Where(p =>
                    text.ToLower().KeepLettersNumbersAndSpace().RemoveAccents().Split(" ").All(txt =>
                        p.SearchTokensAscii.Any(tok => tok.StartsWith(txt)))
                )
                .OrderByDescending(p => p.PoliticalFunctions.Length)
                .Take(50);

            var tokenAnySearch = peopleFilteredList
                .Where(p =>
                    text.ToLower().KeepLettersNumbersAndSpace().Split(" ").Any(txt =>
                        p.SearchTokens.Any(tok => tok.StartsWith(txt)))
                )
                .OrderByDescending(p => p.PoliticalFunctions.Length)
                .Take(50);

            var tokenAnySearchWithoutAccents = peopleFilteredList
                .Where(p =>
                    text.ToLower().KeepLettersNumbersAndSpace().RemoveAccents().Split(" ").Any(txt =>
                        p.SearchTokensAscii.Any(tok => tok.StartsWith(txt)))
                )
                .OrderByDescending(p => p.PoliticalFunctions.Length)
                .Take(50);

            var totalResult = wholeSearchAccented
                .Union(wholeSearch)
                .Union(tokenAllSearch)
                .Union(tokenAllSearchWithoutAccents)
                .Union(tokenAnySearch)
                .Union(tokenAnySearchWithoutAccents)
                .Take(50);

            return JsonConvert.SerializeObject(totalResult);
        }


        public async Task<int> GetPeopleCount()
        {
            var people = await GetCachedPeople();

            return people.Count();
        }

        private async Task<IEnumerable<PersonDTO>> LoadPeople()
        {
            var uri = "nasipolitici_getpoliticians";
            var response = await _httpClient.GetStringAsync(uri);
            var result = JsonConvert.DeserializeObject<List<PersonDTO>>(response);
            return result;
        }

        public async Task<string> GetPerson(string id)
        {
            var uri = $"nasipolitici_getdata/{HttpUtility.UrlEncode(id)}";
            var result = await _httpClient.GetStringAsync(uri);
            return result;
        }

        private async Task<IEnumerable<PersonDTO>> GetCachedPeople()
        {
            var people = await _cache.GetOrCreateAsync<IEnumerable<PersonDTO>>(_peopleCacheKey, entry =>
            {
                entry.SetAbsoluteExpiration(CacheDuration);
                return LoadPeople();
            });

            return people;
        }

        class PersonDTO
        {
            public string NameId { get; set; }
            public string ShortName { get; set; }
            public string FullName { get; set; }
            public int? BirthYear { get; set; }
            public int? DeathYear { get; set; }
            public PoliticalFunction[] PoliticalFunctions { get; set; }
            public string PoliticalParty { get; set; }
            public string StatusText { get; set; }
            public int Status { get; set; }
            public string PhotoUrl { get; set; }
            public string[] SearchTokens
            {
                get 
                {
                    return ShortName.ToLower().KeepLettersNumbersAndSpace().Split(" ");
                } 
            }

            public string[] SearchTokensAscii
            {
                get
                {
                    return ShortName.ToLower().RemoveAccents().KeepLettersNumbersAndSpace().Split(" ");
                }
            }
        }
        
        public class PoliticalFunction
        {
            public string Name { get; set; }
            public string Organisation { get; set; }
        }
    }

}
