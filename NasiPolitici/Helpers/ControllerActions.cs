using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Helpers
{
    public static class ControllerActions
    {
        public static async Task<(HttpStatusCode StatusCode, object Body)> WithErrorHandling<TResult>(Func<Task<TResult>> action)
        {
            try
            {
                return (HttpStatusCode.OK, await action());
            }
            catch (Exception e)
            {
                return (HttpStatusCode.InternalServerError, new
                {
                    Error = e.Message
                });
            }
        }
    }
}
