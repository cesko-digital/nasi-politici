using HlidacStatu.NasiPolitici.Models;

namespace HlidacStatu.NasiPolitici.Data
{
    public interface IDataContext
    {
        PersonSearchResult SearchPersons(string text);
        
        Person GetPerson(string id);
    }
}
