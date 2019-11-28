using HlidacStatu.NasiPolitici.Data;
using HlidacStatu.NasiPolitici.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Controllers
{
    [Route("person")]
    public class PersonController : Controller
    {
        private static readonly TimeSpan CacheDuration = TimeSpan.FromHours(1);

        private readonly IDataContext dataContext;
        private readonly IMemoryCache cache;

        public PersonController(IDataContext dataContext, IMemoryCache cache)
        {
            this.dataContext = dataContext;
            this.cache = cache;
        }

        [Route("search/{query}")]
        public Task<ObjectResult> Search(string query)
        {
            return CachedAsync(() => dataContext.SearchPersons(query));
        }

        [Route("detail/{id}")]
        public Task<ObjectResult> Detail(string id)
        {
            return CachedAsync(() => dataContext.GetPerson(id));
        }

        private async Task<ObjectResult> CachedAsync<TResult>(Func<Task<TResult>> func)
        {
            var actionResult = await ControllerActions.WithErrorHandlingAsync(async () => await cache.GetOrCreateAsync(Request.Path, async entry =>
            {
                entry.SetAbsoluteExpiration(CacheDuration);
                return await func();
            }));

            return StatusCode((int) actionResult.StatusCode, actionResult.Body);
        }
    }
}