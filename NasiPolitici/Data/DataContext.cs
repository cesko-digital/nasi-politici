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
        private const string ApiUrl = "https://www.hlidacstatu.cz/api/v1/nasipolitici_";
        private const string AuthenticationToken = "2b5eb6327814415ab88d71234fb3cc0a";
        private static readonly Lazy<HttpClient> client = new Lazy<HttpClient>(InitializeHttpClient);
                             
        public async Task<PersonSearchResult> SearchPersons(string text)
        {
            var url = $"{ApiUrl}find?query={HttpUtility.UrlEncode(text)}";
            var results = await GetDataAsync<List<Dto.PersonSummary>>(url);
            return new PersonSearchResult
            {
                Persons = results.Select(Transform).ToList()
            };
        }

        public async Task<Person> GetPerson(string id)
        {
            var url = $"{ApiUrl}getdata?id={HttpUtility.UrlEncode(id)}";
            var person = await GetDataAsync<Dto.Person>(url);
            return Transform(person);
        }

        private async Task<T> GetDataAsync<T>(string endpoint)
        {            
            using (var response = await client.Value.GetAsync(endpoint))
            {
                response.EnsureSuccessStatusCode();
                using (var content = response.Content)
                {
                    var result = await content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<T>(result);
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
                BirthYear = summary.BirthYear,
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
                CompanyConnection = person.CompanyConnection,
                BirthDate = person.BirthDate,
                DeathDate = person.DeathDate,
                PhotoUrl = person.Photo,
                SourceUrl = person.Source,
                Roles = person.Roles.Select(Transform).ToList(),
                Donations = person.Sponsor.Select(Transform).ToList(),
                PersonalInsolvency = Transform(person.InsolvencyPerson),
                CompanyInsolvency = Transform(person.InsolvencyCompany)
            };
        }

        private Role Transform(Dto.PersonalRole personalRole)
        {
            return new Role
            {
                Name = personalRole.Role,
                Organization = personalRole.Organisation,
                StartDate = personalRole.DateFrom,
                EndDate = personalRole.DateTo
            };
        }

        private Donation Transform(Dto.Donation donation)
        {
            return new Donation
            {
                Party = donation.Party,
                Source = donation.Source,
                Value = donation.DonatedAmount,
                Year = donation.Year
            };
        }

        private Insolvency Transform(Dto.Insolvency insolvency)
        {
            return new Insolvency
            {
                Debtor = new InsolvencyActor
                {
                    Count = insolvency.DebtorCount,
                    Url = insolvency.DebtorLink
                },
                Creditor = new InsolvencyActor
                {
                    Count = insolvency.CreditorCount,
                    Url = insolvency.CreditorLink
                },
                Bailiff = new InsolvencyActor
                {
                    Count = insolvency.BailiffCount,
                    Url = insolvency.BailiffLink
                }
            };
        }

        private static HttpClient InitializeHttpClient()
        {
            var client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Token", AuthenticationToken);
            return client;
        }
    }
}
