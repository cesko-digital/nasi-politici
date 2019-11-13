using System;
using System.ComponentModel.DataAnnotations;

namespace HlidacStatu.NasiPolitici.Models
{
    public partial class Osoba
    {
        [Key]
        public int InternalId { get; set; }
        public string TitulPred { get; set; }
        public string Jmeno { get; set; }
        public string Prijmeni { get; set; }
        public string TitulPo { get; set; }
        public string Pohlavi { get; set; }
        public DateTime? Narozeni { get; set; }
        public DateTime? Umrti { get; set; }
        public string Ulice { get; set; }
        public string Mesto { get; set; }
        public string PSC { get; set; }
        public string CountryCode { get; set; }
        public bool OnRadar { get; set; }
        public int Status { get; set; }
        public DateTime LastUpdate { get; set; }
        public string NameId { get; set; }
        public string PuvodniPrijmeni { get; set; }
        public string JmenoAscii { get; set; }
        public string PrijmeniAscii { get; set; }
        public string PuvodniPrijmeniAscii { get; set; }

        // chro chro chro
        public string _SummaryInfoFact { get; set; }
        public string _StatInfoFact { get; set; }
        public string _SponzorInfoFact { get; set; }
        public string _AngazovanostInfoFact { get; set; }
        public string _FunkceOsoba { get; set; }

    }
}
