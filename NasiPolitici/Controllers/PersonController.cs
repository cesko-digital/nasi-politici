using HlidacStatu.NasiPolitici.Data;
using HlidacStatu.NasiPolitici.Models;
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
        public PersonSearchResult Search(string query)
        {
            return cache.GetOrCreate($"search_{query}", entry =>
            {
                entry.SetAbsoluteExpiration(CacheDuration);
                return dataContext.SearchPersons(query).Result;
            });
        }

        [Route("detail/{id}")]
        public Person Detail(string id)
        {
            return cache.GetOrCreate($"detail_{id}", entry =>
            {
                entry.SetAbsoluteExpiration(CacheDuration);
                return dataContext.GetPerson(id).Result;
            });
        }
    }
}
