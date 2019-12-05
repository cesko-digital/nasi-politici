using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using HlidacStatu.NasiPolitici.Helpers;
using HlidacStatu.NasiPolitici.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace HlidacStatu.NasiPolitici.Data
{
    public class NewsDataContext : INewsDataContext
    {
        private readonly string apiUrl;
        private readonly string authenticationToken;
        private readonly HttpClient client;

        public NewsDataContext(IConfiguration configuration, HttpClient httpClient)
        {
            apiUrl = configuration["CzFinApiUrl"];
            authenticationToken = configuration["CzFinToken"];
            client = httpClient;
        }

        public async Task<NewsSearchResult> LatestNews(string text)
        {
            var url = $"action=get-latest-news/token={authenticationToken}/keyword={HttpUtility.UrlEncode(text)}";
            var results = await GetDataAsync<List<Dto.News>>(url);
            var list = results.Select(Transform).ToList();
            return new NewsSearchResult
            {
                News = list
            };
        }


        private async Task<T> GetDataAsync<T>(string endpoint)
            where T : class
        {
            using (var request = new HttpRequestMessage(HttpMethod.Get, $"{apiUrl}{endpoint}"))
            {
                request.Headers.Authorization = new AuthenticationHeaderValue("Token", authenticationToken);
                using (var response = await client.SendAsync(request))
                {
                    response.EnsureSuccessStatusCode();
                    var result = await response.Content.ReadAsStringAsync();
                    if (IsNotFound(result))
                    {
                        return null;
                    }
                    return JsonConvert.DeserializeObject<T>(result);
                }
            }
        }

        private bool IsNotFound(string responseContent)
        {
            var errorResponse = JsonHelpers.DeserializeSafe<Dto.ErrorResponse>(responseContent);
            var errorExists = errorResponse != null && !errorResponse.Valid && errorResponse.Error != null;
            var error = errorResponse?.Error;

            if (errorExists && error.Number != 404)
            {
                throw new Exception($"Exception in API: Code '{error.Number}', message: '{error.Description}'.");
            }
            return errorExists;
        }

        private News Transform(Dto.News item)
        {
            return new News
            {
                Headline = item.headline,
                Lang = item.lang,
                Source = item.source,
                Time = item.time,
                Web = item.web
            };
        }

    }
}
