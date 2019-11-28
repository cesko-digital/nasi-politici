using System.Net;

namespace HlidacStatu.NasiPolitici.Helpers
{
    public sealed class ActionResult
    {
        public ActionResult(HttpStatusCode statusCode, object body)
        {
            StatusCode = statusCode;
            Body = body;
        }
        
        public HttpStatusCode StatusCode { get; }
        public object Body { get; }    
    }
}
