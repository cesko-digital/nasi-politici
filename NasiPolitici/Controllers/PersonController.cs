using HlidacStatu.NasiPolitici.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Net.Mime;
using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Controllers
{
    [ApiController]
    [Route("api/v1/person")]
    public class PersonController : Controller
    {
        private static readonly TimeSpan CacheDuration = TimeSpan.FromHours(4);

        private readonly IPoliticianService _politicianService;
        private readonly IMemoryCache _cache;

        public PersonController(IPoliticianService politicianService, IMemoryCache cache)
        {
            _politicianService = politicianService;
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

        //todo: refactor - make this a service, since it is going to work in all controllers the same way
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