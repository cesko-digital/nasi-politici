using System;
using System.Collections.Generic;
using System.Globalization;
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

        public static string GetCzechPlural(int number, string val)
        {
            string[] plural = val.Split(';');
            if (plural.Length != 4)
                throw new ArgumentException("Invalid czech resource. The resource string  " + val + " doesn't contains 3 options.");

            if (number == 0)
                return FormatString(plural[0], number);

            if (number == 1)
                return FormatString(plural[1], number);

            if (number > 1 && number < 5)
                return FormatString(plural[2], number);

            return FormatString(plural[3], number);
        }

        private static string FormatString(string text, int number)
        {
            if (text.Contains("{") && text.Contains("}"))
                return string.Format(text, number);
            else
                return text;
        }

        public static string RemoveDiacritics(this string text)
        {
            var normalizedString = text.Normalize(NormalizationForm.FormD);
            var stringBuilder = new StringBuilder();

            foreach (var c in normalizedString)
            {
                var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
                if (unicodeCategory != UnicodeCategory.NonSpacingMark)
                {
                    stringBuilder.Append(c);
                }
            }

            return stringBuilder.ToString().Normalize(NormalizationForm.FormC);
        }
    }
}
