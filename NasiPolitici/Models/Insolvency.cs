using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Models
{
    public sealed class Insolvency
    {
        public InsolvencyScope Scope { get; set; }
        public int Debtor { get; set; }
        public int Creditor { get; set; }
        public int Administrator { get; set; }
    }
}
