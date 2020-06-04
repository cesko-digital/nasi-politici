using HlidacStatu.NasiPolitici.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;
using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Controllers
{
    [ApiController]
    [Route("api/v1/mail")]
    public class MailController : Controller
    {
        private readonly IMailService _mailService;

        public MailController(IMailService demagogService)
        {
            _mailService = demagogService;
        }

        [HttpPost]
        public async Task<IActionResult> SendMail(Email email)
        {
            var result = await _mailService.SendMail(email.Text, email.Subject);

            return Content(result, MediaTypeNames.Application.Json);
        }
    }

    public class Email
    {
        public string Subject { get; set; }
        public string Text { get; set; }
    }
}
