using System;

namespace HlidacStatu.NasiPolitici.Data.Dto
{
    public sealed class ErrorResponse
    {
        public bool Valid { get; set; }
        public Error Error { get; set; }
    }

    public class Error
    {
        public int Number { get; set; }
        public string Description { get; set; }
    }
}