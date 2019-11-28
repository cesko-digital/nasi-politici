<<<<<<< HEAD
﻿using HlidacStatu.NasiPolitici.Data;
using HlidacStatu.NasiPolitici.Helpers;
=======
using HlidacStatu.NasiPolitici.Data;
using System;
using System.Threading.Tasks;
using HlidacStatu.NasiPolitici.Models;
>>>>>>> origin
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

        private JsonResult Cacheable<TInput, TResult>(TInput input, Func<TInput, string> cacheKeyBuilder, Func<TInput, TResult> func)
        {
            return Json(Actions.Do(() => cache.GetOrCreate(cacheKeyBuilder(input), entry =>
            {
                entry.SetAbsoluteExpiration(CacheDuration);
                return func(input);
            })));
        }

        [Route("search/{query}")]
        public JsonResult Search(string query)
        {
            return Cacheable(query, q => $"search_{q}", dataContext.SearchPersons);
        }

        [Route("detail/{id}")]
        public JsonResult Detail(string id)
        {
            return Cacheable(id, i => $"detail_{i}", dataContext.GetPerson);
        }
    }
}
