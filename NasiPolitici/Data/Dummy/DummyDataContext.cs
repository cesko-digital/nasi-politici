using HlidacStatu.NasiPolitici.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Data.Dummy
{
    public class DummyDataContext : IDataContext
    {
        public Task<PersonSearchResult> SearchPersons(string text)
        {
            return Task.FromResult(new PersonSearchResult
            {
                Persons = new List<PersonSummary>
                {
                    new PersonSummary
                    {
                        Id = "miroslav-kalousek",
                        FirstName = "Miroslav",
                        LastName = "Kalousek",
                        BirthDate = new DateTime(1960, 1, 1),
                        PhotoUrl = "https://www.hlidacstatu.cz/Content/Img/personNoPhoto.png",
                        Description = "\u003cp\u003eMiroslav Kalousek (*1960 ),poslanec (od 2013)  - Poslanecká sněmovna PČR (2013 - 2017)\nposlanec (od 2010 do 2013)  - Poslanecká sněmovna PČR (2010 - 2013).\u003c/p\u003e\u003cp\u003eMiroslav Kalousek mezi roky 2014-17 sponzoroval TOP 09 v celkové výši 400 000  Kč. Nejvyšší sponzorský dar byl ve výši 300 000  Kč.\u003c/p\u003e"
                    }
                }
            });
        }

        public Task<Person> GetPerson(string id)
        {
            return Task.FromResult(new Person
            {
                Id = "andrej-babis",
                TitlePrefix = null,
                TitleSuffix = null,
                FirstName = "Andrej",
                LastName = "Babiš",
                Status = "Politik",
                Description = "\u003cp\u003eAndrej Babiš (*1963 - ✝1951),poslanec (od 2017)  - Poslanecká sněmovna PČR (2017 - 2021)\nposlanec (od 2013 do 2017)  - Poslanecká sněmovna PČR (2013 - 2017).\u003c/p\u003e\u003cp\u003e205 firem, ve kterých se angažuje, v roce 2019 získaly zakázky za celkem 9 mld. Kč.\u003c/p\u003e\u003cp\u003eAndrej Babiš mezi roky 2012-18 sponzoroval 2 polit. strany v celkové výši 19 mil. Kč. Nejvyšší sponzorský dar byl ve výši 3 mil. Kč.\u003c/p\u003e",
                BirthDate = new DateTime(1957, 1, 1),
                DeathDate = null,
                PhotoUrl = "https://www.hlidacstatu.cz/Content/Img/personNoPhoto.png",
                SourceUrl = "https://www.hlidacstatu.cz/osoba/andrej-babis",
                Roles = new List<Role>
                {
                    new Role
                    {
                        Name = "člen",
                        StartDate = new DateTime(2018, 2, 4),
                        EndDate = null,
                        Organization = "ANO 2011"
                    },
                    new Role
                    {
                        Name = "člen",
                        StartDate = new DateTime(1968, 2, 4),
                        EndDate = new DateTime(2018, 10, 4),
                        Organization = "KSC"
                    },
                },
                Donations = new List<Donation>
                {
                    new Donation
                    {
                        Party = "ANO 2011",
                        Value = 50000m,
                        Date = new DateTime(2015, 1, 1),
                        Origin = null
                    },
                    new Donation
                    {
                        Party = "ANO 2011",
                        Value = 50000m,
                        Date = new DateTime(2014, 1, 1),
                        Origin = null
                    }
                },
                Insolvencies = new List<Insolvency>()
            });
        }
    }
}
