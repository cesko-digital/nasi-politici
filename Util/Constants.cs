using System;
using System.Collections.Generic;
using System.Text;

namespace HlidacStatu.Util
{
    public static class Constants
    {
        public static System.Globalization.CultureInfo enCulture = System.Globalization.CultureInfo.InvariantCulture;
        public static System.Globalization.CultureInfo czCulture = System.Globalization.CultureInfo.GetCultureInfo("cs-CZ");
        public static System.Globalization.CultureInfo csCulture = System.Globalization.CultureInfo.GetCultureInfo("cs");
        public static Random Rand = new Random();

        public struct Scale
        {
            public const int Jeden = 1;
            public const int Tisic = 10 * 3;
            public const int Milion = 10 * 6;
            public const int Miliarda = 10 * 9;
            public const int Bilion = 10 * 12;
            public const int Any = -1;
        }

        public struct Currency
        {
            public const string CzechCrown = "Kč";
            public const string Euro = "€";
            public const string Dolar = "$";
            public const string Pound = "£";
        }

        public enum ShowDecimalVal
        {
            Hide = 0,
            Show = 1,
            AsNeeded = -1,
        }
    }
}
