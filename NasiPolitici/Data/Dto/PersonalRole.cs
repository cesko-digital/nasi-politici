using System;

namespace HlidacStatu.NasiPolitici.Data.Dto
{
    public sealed class PersonalRole
    {
        public string Role { get; set; }
        public string Organisation { get; set; }

        public DateTime DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
    }
}