using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Services
{
    public interface INewsService
    {
        Task<string> LatestNews(string text);
    }
}