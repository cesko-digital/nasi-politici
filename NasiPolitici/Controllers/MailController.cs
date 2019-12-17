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
            var result = CacheAsync(() => _mailService.SendMail(email.Text, email.Subject));

            return Content(await result, MediaTypeNames.Application.Json);
        }

        //todo: refactor - make this a service, since it is going to work in all controllers the same way
        private async Task<TResult> CacheAsync<TResult>(Func<Task<TResult>> func)
        {
            var result = await _cache.GetOrCreateAsync(Request.Path, entry =>
            {
                entry.SetAbsoluteExpiration(CacheDuration);
                return func();
            });

            return result;
        }
    }

    public class Email
    {
        public string Subject { get; set; }
        public string Text { get; set; }
    }
}
