using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;

namespace HlidacStatu.NasiPolitici.Services
{
    public class MediaService : IMediaService
    {
        private readonly HttpClient _httpClient;
        private readonly IMemoryCache _cache;
        private readonly string _politiciansCacheKey = "_politiciansCacheKey";
        private readonly TimeSpan _politiciansCacheDuration = TimeSpan.FromHours(2);

        public MediaService(HttpClient httpClient, IMemoryCache cache)
        {
            _httpClient = httpClient;
            _cache = cache;
        }

        public async Task<string> GetArticles(string name, string party, string query)
        {
            var politicianId = await GetPolitician(name, party, query);

            if (string.IsNullOrWhiteSpace(politicianId))
                return "";

            var articlesUrl = $"articles/{politicianId}/?count=100/";
            var response = await _httpClient.GetAsync(articlesUrl);
            //var response = await _httpClient.GetAsync($"articles/{politicianId}");
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsStringAsync();
                result = Regex.Replace(result, "<.*?>", String.Empty);
                result = result.Replace("&hellip;", "…")
                    .Replace("&nbsp;", " ")
                    .Replace("&quot;", @"\""");
                return result;
            }

            throw new HttpRequestException($"Media responded with statusCode=[{response.StatusCode}].");
        }

        private async Task<string> GetPolitician(string name, string party, string query)
        {
            var politicians = await _cache.GetOrCreateAsync<List<Politician>>(_politiciansCacheKey, entry =>
            {
                entry.SetAbsoluteExpiration(_politiciansCacheDuration);
                return GetPoliticians();
            });

            if (politicians != null && politicians.Count > 0)
            {
                var id = politicians
                    .FirstOrDefault(p => (p.Name?.Trim()?.ToLower() ?? "") == (name?.Trim()?.ToLower() ?? "")
                                         && (p.Party?.Trim()?.ToLower() ?? "") == (party?.Trim()?.ToLower() ?? ""))?.Id;
                return id;
                
            }
            
            throw new HttpRequestException($"No politicians found. (contact BE admin)");
        }

        private async Task<List<Politician>> GetPoliticians()
        {
            var response = await _httpClient.GetAsync("politicians/");
            if (response.IsSuccessStatusCode)
            {
                var jsonResult = await response.Content.ReadAsStringAsync();
                var politicians = JsonConvert.DeserializeObject<List<Politician>>(jsonResult);
                return politicians;
            }

            throw new HttpRequestException($"Monitora responded with statusCode=[{response.StatusCode}].");
        }
    }

    public class Politician
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Party { get; set; }
        public string Search_Query { get; set; }
    }
}