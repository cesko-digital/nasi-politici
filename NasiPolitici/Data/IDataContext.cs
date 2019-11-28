using System.Threading.Tasks;
using HlidacStatu.NasiPolitici.Models;

namespace HlidacStatu.NasiPolitici.Data
{
    public interface IDataContext
    {
        Task<PersonSearchResult> SearchPersons(string text);
        
        Task<Person> GetPerson(string id);
    }
}
