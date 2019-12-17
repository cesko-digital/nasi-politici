using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Services
{
    public interface IMailService
    {
        Task<string> SendMail(string text, string subject);
    }
}