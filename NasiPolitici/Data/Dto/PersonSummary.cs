using System;

namespace HlidacStatu.NasiPolitici.Data.Dto
{
    public sealed class PersonSummary
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int BirthYear { get; set; }
        public string Photo { get; set; }
        public string Description { get; set; }

        public string CurrentParty { get; set; }
    }
}
