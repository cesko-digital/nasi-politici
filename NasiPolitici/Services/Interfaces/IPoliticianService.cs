using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Services
{
    public interface IPoliticianService
    {
        Task<string> GetPerson(string id);
        Task<string> SearchPeople(string text, string place, string function, string party);
        Task<int> GetPeopleCount();
    }
}