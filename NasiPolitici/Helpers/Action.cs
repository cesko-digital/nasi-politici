using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Helpers
{
    public static class Actions
    {
        public static object Do<TResult>(Func<TResult> action)
        {
            try
            {
                return action();
            }
            catch (Exception e)
            {
                return new
                {
                    Error = e.Message
                };
            }
        }
    }
}
