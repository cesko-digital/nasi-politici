using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Services
{
    public interface IMonitoraService
    {
        Task<string> GetArticles(string json);
    }
}