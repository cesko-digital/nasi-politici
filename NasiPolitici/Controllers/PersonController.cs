using HlidacStatu.NasiPolitici.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Caching.Memory;

namespace HlidacStatu.NasiPolitici.Controllers
{
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
                Persons = new List<PersonSummary>
                {
                    new PersonSummary
                    {
                        FirstName = "sdfsdf",
                        BirthDate = DateTime.UtcNow
                    }
                }
            };
        }

        public Person Detail(string id)
        {
            throw new NotImplementedException();
        }
    }
}
