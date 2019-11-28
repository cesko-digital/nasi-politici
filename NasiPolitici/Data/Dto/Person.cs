using System;
using System.Collections.Generic;

namespace HlidacStatu.NasiPolitici.Data.Dto
{
    public sealed class Person
    {
        public string Id { get; set; }
        public string NamePrefix { get; set; }
        public string NameSuffix { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }
        public string CompanyConnection { get; set; }

        public DateTime BirthDate { get; set; }
        public DateTime? DeathDate { get; set; }

        public string Photo { get; set; }
        public string Source { get; set; }

        public List<PersonalRole> Roles { get; set; }
        public List<Donation> Sponsor { get; set; }
        
        public Insolvency InsolvencyPerson { get; set; }
        public Insolvency InsolvencyCompany { get; set; }
    }
}
