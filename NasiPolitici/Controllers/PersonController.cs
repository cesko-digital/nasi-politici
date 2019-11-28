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
        private readonly IDataProvider dataProvider;
        private IMemoryCache cache;

        public PersonController(IMemoryCache cache)
        {
            this.cache = cache;
        }

        public PersonSearchResult Search(string query)
        {
            var searchResult = dataProvider.Search(query);
            return new PersonSearchResult
            {
                Persons = searchResult.Items.Select(p => new PersonSummary
                {
                    FirstName = "Karel"
                }).ToList()
            };
        }

        public Person Detail(string id)
        {
            throw new NotImplementedException();
        }
    }
}
