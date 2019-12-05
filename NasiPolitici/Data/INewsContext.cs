using System.Threading.Tasks;
using HlidacStatu.NasiPolitici.Models;

namespace HlidacStatu.NasiPolitici.Data
{
    public interface INewsDataContext
    {
        Task<NewsSearchResult> LatestNews(string text);
    }
}
