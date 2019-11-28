namespace HlidacStatu.NasiPolitici.Data.Dto
{
    public sealed class Insolvency
    {
        public int DebtorCount { get; set; }
        public string DebtorLink { get; set; }
        
        public int CreditorCount { get; set; }
        public string CreditorLink { get; set; }
        
        public int BailiffCount { get; set; }
        public string BailiffLink { get; set; }
    }
}