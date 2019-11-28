using System;
using System.Threading.Tasks;
using HlidacStatu.NasiPolitici.Data;
using HlidacStatu.NasiPolitici.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

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
        public Task<PersonSearchResult> Search(string query)
        {
            return cache.GetOrCreateAsync($"search_{query}", async entry =>
            {
                entry.SetAbsoluteExpiration(CacheDuration);
                return await dataContext.SearchPersons(query);
            });
        }

        [Route("detail/{id}")]
        public Task<Person> Detail(string id)
        {
            return cache.GetOrCreateAsync($"detail_{id}", async entry =>
            {
                entry.SetAbsoluteExpiration(CacheDuration);
                return await dataContext.GetPerson(id);
            });
        }
    }
}
