using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Services
{
    public interface IMediaService
    {
        Task<string> GetArticles(string json);
    }
}