using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Services
{
    public interface IDemagogService
    {
        Task<string> GetStats(UniversalId osobaId);
    }
}