using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Helpers
{
    public static class JsonHelpers
    {
        public static T DeserializeSafe<T>(string text)
            where T : class
        {
            try
            {
                return JsonConvert.DeserializeObject<T>(text);
            }
            catch
            {
                return null;
            }
        }
    }
}
