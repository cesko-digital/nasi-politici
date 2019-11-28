using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using HlidacStatu.NasiPolitici.Models;
using Newtonsoft.Json;

namespace HlidacStatu.NasiPolitici.Data
{
    public class DataContext : IDataContext
    {
        public async Task<PersonSearchResult> SearchPersons(string text)
        {
            var url = $"https://www.hlidacstatu.cz/api/v1/nasipolitici_find?query={HttpUtility.UrlEncode(text)}";
            var results = await GetDataAsync<List<Dto.PersonSummary>>(url);
            return new PersonSearchResult
            {
                Persons = results.Select(Transform).ToList()
            };
        }

        public async Task<Person> GetPerson(string id)
        {
            var url = $"https://www.hlidacstatu.cz/api/v1/nasipolitici_getdata?id={HttpUtility.UrlEncode(id)}";
            var person = await GetDataAsync<Dto.Person>(url);
            return Transform(person);
        }
        
        private async Task<T> GetDataAsync<T>(string endpoint)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Token", "2b5eb6327814415ab88d71234fb3cc0a");
                using (var response = await client.GetAsync(endpoint))
                {
                    response.EnsureSuccessStatusCode();
                    using (var content = response.Content)
                    {
                        var result = await content.ReadAsStringAsync();
                        return JsonConvert.DeserializeObject<T>(result);
                    }    
                }
            }
        }

        private PersonSummary Transform(Dto.PersonSummary summary)
        {
            return new PersonSummary
            {
                Id = summary.Id,
                FirstName = summary.Name,
                LastName = summary.Surname,
                Description = summary.Description,
                BirthDate = new DateTime(summary.BirthYear, 1, 1),
                PhotoUrl = summary.Photo
            };
        }

        private Person Transform(Dto.Person person)
        {
            return new Person
            {
                Id = person.Id,
                TitlePrefix = person.NamePrefix,
                TitleSuffix = person.NameSuffix,
                FirstName = person.Name,
                LastName = person.Surname,
                Status = person.Status,
                Description = person.Description,
                BirthDate = person.BirthDate,
                DeathDate = person.DeathDate,
                PhotoUrl = person.Photo,
                SourceUrl = person.Source,
                Roles = person.Roles.Select(Transform).ToList(),
                Donations = person.Sponsor.Select(Transform).ToList()
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
