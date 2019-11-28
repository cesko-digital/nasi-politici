using HlidacStatu.NasiPolitici.Models;

namespace HlidacStatu.NasiPolitici.Data
{
    public interface IDataContext
    {
        PersonSearchResult Search(string text);
        
        Person GetPoliticianData(string id);
    }
}
