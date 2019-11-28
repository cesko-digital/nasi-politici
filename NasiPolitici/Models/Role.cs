using System;
using System.Collections.Generic;

namespace HlidacStatu.NasiPolitici.Models
{
    public sealed class Role
    {
        public string Name { get; set; }
        public string Organization { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
