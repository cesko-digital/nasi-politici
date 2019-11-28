using HlidacStatu.NasiPolitici.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Caching.Memory;

namespace HlidacStatu.NasiPolitici.Controllers
{
    public class ExternalSearchResult
    {
        public List<object> Items { get; }
    }
    public class ExternalDetail
    {

    }

    public interface IDataProvider
    {
        ExternalSearchResult Search(string query);
        ExternalDetail GetDetail(string id);
    }

    public class PersonController : Controller
    {
        private readonly IMemoryCache cache;

        public PersonController(IMemoryCache cache)
        {        
            this.cache = cache;            
        }

        public PersonSearchResult Search(string query)
        {
            return new PersonSearchResult
            {
                Persons = new[]
                {
                    new PersonSummary
                    {
                        FirstName = "sdfsdf",
                        BirthDate = DateTime.UtcNow
                    }
                }.ToList()
            };
        }

        public Person Detail(string id)
        {
            throw new NotImplementedException();
        }
    }
}
