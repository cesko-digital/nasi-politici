using HlidacStatu.NasiPolitici.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Net.Mime;
using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Controllers
{
    [ApiController]
    [Route("api/v1/demagog")]
    public class DemagogController : Controller
    {
        private static readonly TimeSpan CacheDuration = TimeSpan.FromHours(4);

        private readonly IDemagogService _demagogService;
        private readonly IMemoryCache _cache;

        public DemagogController(IDemagogService demagogService, IMemoryCache cache)
        {
            _demagogService = demagogService;
            _cache = cache;
        }

        [Route("{osobaId}")]
        public async Task<IActionResult> GetStats(string osobaId)
        {
            var result = CacheAsync(() => _demagogService.GetStats(osobaId));

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
