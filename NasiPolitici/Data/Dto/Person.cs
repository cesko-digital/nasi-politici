using System;
using System.Collections.Generic;

namespace HlidacStatu.NasiPolitici.Data.Dto
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

        public DateTime BirthDate { get; set; }
        public DateTime? DeathDate { get; set; }

        public string PhotoUrl { get; set; }
        public string SourceUrl { get; set; }

        public List<Role> Roles { get; set; }
        public List<Donation> Donations { get; set; }
        public List<Insolvency> Insolvencies { get; set; }
    }
}
