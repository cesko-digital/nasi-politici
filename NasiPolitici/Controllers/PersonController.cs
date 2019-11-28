using HlidacStatu.NasiPolitici.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.Extensions.Caching.Memory;
using HlidacStatu.NasiPolitici.Data;

namespace HlidacStatu.NasiPolitici.Controllers
{
    public class PersonController : Controller
    {
        private readonly IDataContext dataContext;
        private readonly IMemoryCache cache;

        public PersonController(IDataContext dataContext, IMemoryCache cache)
        {
            this.dataContext = dataContext;
            this.cache = cache;            
        }

        public PersonSearchResult Search(string query)
        {
            return cache.GetOrCreate($"query_{query}", entry =>
            {
                entry.SetAbsoluteExpiration(TimeSpan.FromSeconds(5));
                return dataContext.Search(query);
            });
        }

        public Person Detail(string id)
        {
            return cache.GetOrCreate($"detail_{id}", entry =>
            {
                entry.SetAbsoluteExpiration(TimeSpan.FromSeconds(5));
                return dataContext.GetPoliticianData(id);
            });
        }
    }
}
