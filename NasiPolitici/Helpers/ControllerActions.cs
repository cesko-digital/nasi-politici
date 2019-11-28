using System;
using System.Net;
using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Helpers
{
    public static class ControllerActions
    {
        public static async Task<ActionResult> WithErrorHandlingAsync<TResult>(Func<Task<TResult>> func)
        {
            try
            {
                var result = await func();
                if (result == null)
                {
                    return new ActionResult(HttpStatusCode.NotFound, null);    
                }
                return new ActionResult(HttpStatusCode.OK, result);
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
