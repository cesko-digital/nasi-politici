using HlidacStatu.NasiPolitici.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Net.Mime;
using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Controllers
{
    [ApiController]
    [Route("api/v1/mail")]
    public class MailController : Controller
    {
        private static readonly TimeSpan CacheDuration = TimeSpan.FromHours(4);

        private readonly IMailService _mailService;
        private readonly IMemoryCache _cache;

        public MailController(IMailService demagogService, IMemoryCache cache)
        {
            _mailService = demagogService;
            _cache = cache;
        }

        [HttpPost]
        public async Task<IActionResult> SendMail(Email email)
        {
            var result = _mailService.SendMail(email.Text, email.Subject);

            return Content(await result, MediaTypeNames.Application.Json);
        }
        
    }

    public class Email
    {
        public string Subject { get; set; }
        public string Text { get; set; }
    }
}
