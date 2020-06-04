using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Services
{
    public class MailService : IMailService
    {
        private readonly MailConfiguration _mailConfiguration;

        public MailService(IOptions<MailConfiguration> options)
        {
            _mailConfiguration = options.Value;
        }

        public async Task<string> SendMail(string text, string subject)
        {
            
            var client = new SendGridClient(_mailConfiguration.ApiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress(_mailConfiguration.From),
                Subject = subject,
                PlainTextContent = text
            };
            foreach(string recipient in _mailConfiguration.Tos.Split(";"))
            {
                msg.AddTo(new EmailAddress(recipient));
            }
            var response = await client.SendEmailAsync(msg).ConfigureAwait(false);
            return await response.Body.ReadAsStringAsync().ConfigureAwait(false);
            
        }
    }
}
