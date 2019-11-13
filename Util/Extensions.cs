using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using static HlidacStatu.Util.Constants;

namespace HlidacStatu.Util
{
    public static class Extensions
    {
        public static IEnumerable<T> Shuffle<T>(this IEnumerable<T> source)
        {
            return source.OrderBy<T, int>((item) => Constants.Rand.Next());
        }

        public static string ShortNicePrice(this float number,
            string valueIfZero = "0 {0}",
            string mena = Currency.CzechCrown,
            ShowDecimalVal showDecimal = ShowDecimalVal.Hide,
            int exactScale = Scale.Any,
            bool hideSuffix = false) => ShortNicePrice((decimal)number, valueIfZero, mena, showDecimal, exactScale, hideSuffix);

        public static string ShortNicePrice(this decimal number,
            string valueIfZero = "0 {0}", 
            string mena = Currency.CzechCrown,
            ShowDecimalVal showDecimal = ShowDecimalVal.Hide,
            int exactScale = Scale.Any,
            bool hideSuffix = false)
        {

            decimal n = number;

            string suffix;
            if ((n > Scale.Bilion && exactScale == Scale.Any) || exactScale == Scale.Bilion)
            {
                n /= Scale.Bilion;
                suffix = "bil.";
            }
            else if ((n > Scale.Miliarda && exactScale == Scale.Any) || exactScale == Scale.Miliarda)
            {
                n /= Scale.Miliarda;
                suffix = "mld.";
            }
            else if ((n > Scale.Milion && exactScale == Scale.Any) || exactScale == Scale.Milion)
            {
                n /= Scale.Milion;
                suffix = "mil.";
            }
            else if (exactScale == Scale.Tisic)
            {
                n /= Scale.Tisic;
                suffix = "tis.";
            }
            else
            {
                suffix = "";
            }

            if (hideSuffix)
                suffix = "";

            string ret = string.Empty;

            string formatString = "{0:### ### ### ### ### ##0} " + suffix + " {1}";
            if (showDecimal == ShowDecimalVal.Show)
                formatString = "{0:### ### ### ### ### ##0.00} " + suffix + " {1}";
            else if (showDecimal == ShowDecimalVal.AsNeeded)
                formatString = "{0:### ### ### ### ### ##0.##} " + suffix + " {1}";


            if (number == 0)
            {
                if (valueIfZero.Contains("{0}"))
                    ret = string.Format(valueIfZero, mena);
                else
                    ret = valueIfZero;
            }
            else
            {
                ret = String.Format(formatString, n, mena).Trim();
            }

            ret = ret.Trim();

            return ret;


        }
    }
}
