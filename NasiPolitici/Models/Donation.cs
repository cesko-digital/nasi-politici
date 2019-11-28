using System;

namespace HlidacStatu.NasiPolitici.Models
{
    public sealed class Donation
    {
        public string Party { get; set; }
        public decimal Value { get; set; }
        public DateTime DateTime { get; set; }
        public string Origin { get; set; }
    }
}