using HlidacStatu.NasiPolitici.Data;
using HlidacStatu.NasiPolitici.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;

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
        public JsonResult Search(string query)
        {
            return Cacheable(() => dataContext.SearchPersons(query));
        }

        [Route("detail/{id}")]
        public JsonResult Detail(string id)
        {
            return Cacheable(() => dataContext.GetPerson(id));
        }

        private JsonResult Cacheable<TResult>(Func<TResult> func)
        {
            return Json(ControllerActions.WithErrorHandling(() => cache.GetOrCreate(Request.Path, entry =>
            {
                entry.SetAbsoluteExpiration(CacheDuration);
                return func();
            })));
        }
    }
}
