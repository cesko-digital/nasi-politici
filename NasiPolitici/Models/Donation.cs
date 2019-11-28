using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Models
{
    public sealed class Donation
    {
        public string Party { get; set; }
        public decimal Value { get; set; }
        public DateTime Date { get; set; }
        public string Origin { get; set; }
    }
}
