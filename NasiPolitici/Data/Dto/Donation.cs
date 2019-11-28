using System;

namespace HlidacStatu.NasiPolitici.Data.Dto
{
    public sealed class Donation
    {
        public string Party { get; set; }
        public string Source { get; set; }
        public decimal DonatedAmount { get; set; }
        public int Year { get; set; }
    }
}