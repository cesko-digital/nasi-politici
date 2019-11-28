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
        public static async Task<ActionResult> WithErrorHandling<TResult>(Func<Task<TResult>> action)
        {
            try
            {
                return new ActionResult(HttpStatusCode.OK, await action());
            }
            catch (Exception e)
            {
                return new ActionResult(HttpStatusCode.InternalServerError, new
                {
                    Error = e.Message
                });
            }
        }
    }
}
