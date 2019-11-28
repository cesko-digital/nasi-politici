using HlidacStatu.NasiPolitici.Models;
using System.Linq;

namespace HlidacStatu.NasiPolitici.Data
{
    public class DataContext : IDataContext
    {
        public PersonSearchResult SearchPersons(string text)
        {
            return null;
        }

        public Person GetPerson(string id)
        {
            return null;
        }

        private PersonSummary Transform(Dto.PersonSummary summary)
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

        private Person Transform(Dto.Person person)
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

        private Role Transform(Dto.Role role)
        {
            return new Role
            {
                Name = role.Name,
                Organization = role.Organization,
                StartDate = role.StartDate,
                EndDate = role.EndDate
            };
        }

        private Donation Transform(Dto.Donation donation)
        {
            return new Donation
            {
                Party = donation.Party,
                Origin = donation.Origin,
                Value = donation.Value,
                Date = donation.Date
            };
        }

        private Insolvency Transform(Dto.Insolvency insolvency)
        {
            return new Insolvency();
        }
    }
}
