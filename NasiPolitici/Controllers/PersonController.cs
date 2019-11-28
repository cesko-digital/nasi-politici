using HlidacStatu.NasiPolitici.Data;
using HlidacStatu.NasiPolitici.Helpers;
using HlidacStatu.NasiPolitici.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Controllers
{
    [Route("person")]
    public class PersonController : Controller
    {
        private readonly IDataContext dataContext;
        private readonly IMemoryCache cache;

        private static readonly TimeSpan CacheDuration = TimeSpan.FromHours(1);

        public PersonController(IDataContext dataContext, IMemoryCache cache)
        {
            this.dataContext = dataContext;
            this.cache = cache;
        }

        [Route("search/{query}")]
        public Task<ObjectResult> Search(string query)
        {
            return CacheableAsync<PersonSearchResult>(() => dataContext.SearchPersons(query));
        }

        [Route("detail/{id}")]
        public Task<ObjectResult> Detail(string id)
        {
            return CacheableAsync<Person>(() => dataContext.GetPerson(id));
        }

        private async Task<ObjectResult> CacheableAsync<TResult>(Func<Task<TResult>> func)
        {
            var actionResult = await ControllerActions.WithErrorHandling(async () => await cache.GetOrCreateAsync(Request.Path, async entry =>
            {
                entry.SetAbsoluteExpiration(CacheDuration);
                return await func();
            }));

            return StatusCode((int) actionResult.StatusCode, actionResult.Body);
        }
    }
}
