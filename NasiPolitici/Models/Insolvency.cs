namespace HlidacStatu.NasiPolitici.Models
{
    public sealed class Insolvency
    {
        public InsolvencyActor Debtor { get; set; }
        public InsolvencyActor Creditor { get; set; }
        public InsolvencyActor Bailiff { get; set; }
    }
}