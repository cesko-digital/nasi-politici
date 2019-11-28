using System.Linq;
using HlidacStatu.NasiPolitici.ExternalApiData;
using HlidacStatu.NasiPolitici.Models;

namespace HlidacStatu.NasiPolitici.Data
{
    public class CachedDataContext : IDataContext
    {
        private IDataSource dataSource;
        
        public CachedDataContext()
        {
            dataSource = new SampleDataSource();
        }
        
        public PersonSearchResult Search(string text)
        {
            var data = dataSource.Search(text);
            return Transform(data);
        }

        public Person GetPoliticianData(string id)
        {
            var data = dataSource.GetPoliticianData(id);
            return Transform(data);
        }

        private PersonSearchResult Transform(ExternalApiData.Dto.PersonSearchResult searchResult)
        {
            return new PersonSearchResult
            {
                Persons = searchResult.Persons.Select(Transform).ToList()
            };
        }
        
        private PersonSummary Transform(ExternalApiData.Dto.PersonSummary summary)
        {
            return new PersonSummary
            {
                Id = summary.Id,
                FirstName = summary.FirstName,
                LastName = summary.LastName,
                Description = summary.Description,
                BirthDate = summary.BirthDate,
                PhotoUrl = summary.PhotoUrl
            };
        }
        
        private Person Transform(ExternalApiData.Dto.Person person)
        {
            return new Person
            {
                Id = person.Id,
                TitlePrefix = person.TitlePrefix,
                TitleSuffix = person.TitleSuffix,
                FirstName = person.FirstName,
                LastName = person.LastName,
                Status = person.Status,
                Description = person.Description,
                BirthDate = person.BirthDate,
                DeathDate = person.DeathDate,
                PhotoUrl = person.PhotoUrl,
                SourceUrl = person.SourceUrl,
                Roles = person.Roles.Select(Transform).ToList(),
                Donations = person.Donations.Select(Transform).ToList(),
                Insolvencies = person.Insolvencies.Select(Transform).ToList()
            };
        }
        
        private Role Transform(ExternalApiData.Dto.Role summary)
        {
            return new Role();
        }
        
        private Donation Transform(ExternalApiData.Dto.Donation donation)
        {
            return new Donation
            {
                Party = donation.Party,
                Origin = donation.Origin,
                Value = donation.Value,
                Date = donation.Date
            };
        }
        
        private Insolvency Transform(ExternalApiData.Dto.Insolvency summary)
        {
            return new Insolvency();
        }
    }
}
