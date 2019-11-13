using HlidacStatu.Util;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Models
{
    // make an extension class maybe
    public partial class Osoba
    {

        public string GetNarozeniUmrtiYear()
        {
            if (!Narozeni.HasValue && !Umrti.HasValue)
                return "";

            StringBuilder stringBuilder = new StringBuilder("(");
            if (Narozeni.HasValue)
                stringBuilder.Append(Narozeni?.ToString("*yyyy"));
            if (Umrti.HasValue)
            {
                if (Narozeni.HasValue)
                    stringBuilder.Append(" - ");

                stringBuilder.Append(Umrti?.ToString("- ✝yyyy"));
            }
            stringBuilder.Append(")");

            return stringBuilder.ToString();
        }
        public string GetFullNameWithYear()
        {
            return $"{GetFullName()} {GetNarozeniUmrtiYear()}";
        }
        public string GetFullName()
        {
            return $"{TitulPred} {Jmeno} {Prijmeni}, {TitulPo}".Trim(new char[] { ' ', ',' });
        }
        public string GetPhotoUrl()
        {
            string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "faces");
            if (File.Exists(path))
                return $"~/images/faces/{NameId}";
            else
                return "~/images/faces/personNoPhoto.png";
        }

        public InfoFact[] GetInfoFacts()
        {
            InfoFact[] infoFacts = new InfoFact[]
            {
                SummaryInfoFact(),
                StatInfoFact(),
                SponzorInfoFact(),
                AngazovanostInfoFact()
            };
            
            return infoFacts;
        }

        private InfoFact SummaryInfoFact()
        {
            return new InfoFact(_SummaryInfoFact, InfoFact.ImportanceLevel.Summary);
        }

        private InfoFact StatInfoFact()
        {
            return new InfoFact(_StatInfoFact, InfoFact.ImportanceLevel.Stat);
        }

        private InfoFact SponzorInfoFact()
        {
            return new InfoFact(_SponzorInfoFact, InfoFact.ImportanceLevel.Medium);
        }

        private InfoFact AngazovanostInfoFact()
        {
            return new InfoFact(_AngazovanostInfoFact, InfoFact.ImportanceLevel.Medium);
        }

    }
}
