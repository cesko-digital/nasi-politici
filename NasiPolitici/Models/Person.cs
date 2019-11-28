using System;
using System.Collections.Generic;

namespace HlidacStatu.NasiPolitici.Models
{
    public sealed class Person
    {
        public string Id { get; set; }
        public string TitlePrefix { get; set; }
        public string TitleSuffix { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }
        public string CompanyConnection { get; set; }

        public DateTime BirthDate { get; set; }
        public DateTime? DeathDate { get; set; }

        public string PhotoUrl { get; set; }
        public string SourceUrl { get; set; }

        public List<Role> Roles { get; set; }
        public List<Donation> Donations { get; set; }
        public Insolvency PersonalInsolvency { get; set; }
        public Insolvency CompanyInsolvency { get; set; }
    }
}
