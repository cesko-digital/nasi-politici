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
        private readonly INewsDataContext newsDataContext;
        private readonly IMemoryCache cache;

        public PersonController(IDataContext dataContext, INewsDataContext newsDataContext, IMemoryCache cache)
        {
            this.dataContext = dataContext;
            this.newsDataContext = newsDataContext;
            this.cache = cache;
        }

        [Route("search/{query}")]
        public Task<ObjectResult> Search(string query)
        {
            Response?.Headers?.Add("Access-Control-Allow-Origin", "*");
            Response?.Headers?.Add("Access-Control-Allow-Methods", "GET");
            Response?.Headers?.Add("Access-Control-Allow-Headers", "Content-Type");
            return CachedAsync(() => dataContext.SearchPersons(query));
        }

        [Route("detail/{id}")]
        public Task<ObjectResult> Detail(string id)
        {
            Response?.Headers?.Add("Access-Control-Allow-Origin", "*");
            Response?.Headers?.Add("Access-Control-Allow-Methods", "GET");
            Response?.Headers?.Add("Access-Control-Allow-Headers", "Content-Type");
            return CachedAsync(() => dataContext.GetPerson(id));
        }

        [Route("news/{id}")]
        public Task<ObjectResult> News(string id)
        {
            Response?.Headers?.Add("Access-Control-Allow-Origin", "*");
            Response?.Headers?.Add("Access-Control-Allow-Methods", "GET");
            Response?.Headers?.Add("Access-Control-Allow-Headers", "Content-Type");

            return CachedAsync(() => newsDataContext.LatestNews(id));
        }

        private async Task<ObjectResult> CachedAsync<TResult>(Func<Task<TResult>> func)
        {
            var actionResult = await ControllerActions.WithErrorHandlingAsync(() => cache.GetOrCreateAsync(Request.Path, entry =>
            {
                entry.SetAbsoluteExpiration(CacheDuration);
                return func();
            }));

            return StatusCode((int)actionResult.StatusCode, actionResult.Body);
        }
    }
}