using HlidacStatu.NasiPolitici.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.IO;
using System.Net.Mime;
using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Controllers
{
    [ApiController]
    [Route("api/v1/news")]
    public class NewsController : Controller
    {
        private static readonly TimeSpan CacheDuration = TimeSpan.FromHours(4);

        private readonly IMonitoraService _monitoraService;
        private readonly INewsService _newsService;
        private readonly IMemoryCache _cache;

        public NewsController(IMonitoraService monitoraService, INewsService newsService, IMemoryCache cache)
        {
            _monitoraService = monitoraService;
            _newsService = newsService;
            _cache = cache;
        }

        [HttpPost("monitora")]
        public async Task<IActionResult> GetMonitoraArticles()
        {
            string body = "";
            using (var reader = new StreamReader(Request.Body))
            {
                body = await reader.ReadToEndAsync();
            }
            string key = $"{Request.Path}/{body}";

            var result = CacheAsync(key, () => _monitoraService.GetArticles(body));

            return Content(await result, MediaTypeNames.Application.Json);
        }

        [Route("czfin/{id}")]
        public async Task<IActionResult> CzFin(string id)
        {
            
            var result = CacheAsync(Request.Path, () => _newsService.LatestNews(id));

            return Content(await result, MediaTypeNames.Application.Json);
        }


        //todo: refactor - make this a service, since it is going to work in all controllers the same way
        private async Task<TResult> CacheAsync<TResult>(string key, Func<Task<TResult>> func)
        {
            var result = await _cache.GetOrCreateAsync(key, entry =>
            {
                entry.SetAbsoluteExpiration(CacheDuration);
                return func();
            });

            return result;
        }


    }

}
