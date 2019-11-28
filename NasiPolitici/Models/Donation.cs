using System;

namespace HlidacStatu.NasiPolitici.Models
{
    public sealed class Donation
    {
        public string Party { get; set; }
        public string Source { get; set; }
        public decimal Value { get; set; }
        public int Year { get; set; }
    }
}