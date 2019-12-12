using HlidacStatu.NasiPolitici.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Net.Mime;
using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Controllers
{
    [ApiController]
    [Route("person")]
    public class PersonController : Controller
    {
        private static readonly TimeSpan CacheDuration = TimeSpan.FromHours(4);

        private readonly IPoliticianService _politicianService;
        private readonly INewsService _newsService;
        private readonly IMemoryCache _cache;

        public PersonController(IPoliticianService politicianService, INewsService newsService, IMemoryCache cache)
        {
            _politicianService = politicianService;
            _newsService = newsService;
            _cache = cache;
        }

        [Route("search/{query}")]
        public async Task<IActionResult> Search(string query)
        {
            var result = CacheAsync(() => _politicianService.SearchPeople(query));

            return Content(await result, MediaTypeNames.Application.Json);
        }

        [Route("detail/{id}")]
        public async Task<IActionResult> Detail(string id)
        {
            var result = CacheAsync(() => _politicianService.GetPerson(id));

            return Content(await result, MediaTypeNames.Application.Json);
        }

        [Route("news/{id}")]
        public async Task<IActionResult> News(string id)
        {
            var result = CacheAsync(() => _newsService.LatestNews(id));

            return Content(await result, MediaTypeNames.Application.Json);
        }

        private async Task<TResult> CacheAsync<TResult>(Func<Task<TResult>> func)
        {
            var result = await _cache.GetOrCreateAsync(Request.Path, entry =>
            {
                entry.SetAbsoluteExpiration(CacheDuration);
                return func();
            });

            return result;
        }
        
    }
}