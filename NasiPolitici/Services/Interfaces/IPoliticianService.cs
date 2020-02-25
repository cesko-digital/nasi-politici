using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Services
{
    public interface IPoliticianService
    {
        Task<string> GetPerson(string id);
        Task<string> SearchPeople(string text);
        Task<int> GetPeopleCount();
    }
}