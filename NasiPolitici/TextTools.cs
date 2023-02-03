using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;

namespace HlidacStatu.NasiPolitici
{
    public static class TextTools
    {
        public static string RemoveAccents(this string input)
        {
            var normalizedString = input.Normalize(NormalizationForm.FormD);
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

        public static string KeepLettersNumbersAndSpace(this string input)
        {
            var res = Regex.Replace(input, @"[^\w ]", "",RegexOptions.CultureInvariant);
            res = res.Replace("_", "");
            return res;
        }
    }
}
