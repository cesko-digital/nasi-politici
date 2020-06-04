using HlidacStatu.NasiPolitici.Services;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Net.Mime;
using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Controllers
{
    [ApiController]
    [Route("api/v1/news")]
    public class NewsController : Controller
    {
        private readonly IMonitoraService _monitoraService;
        private readonly INewsService _newsService;

        public NewsController(IMonitoraService monitoraService, INewsService newsService)
        {
            _monitoraService = monitoraService;
            _newsService = newsService;
        }

        [HttpGet("monitora")]
        public async Task<IActionResult> GetMonitoraArticles()
        {
            string body = "";
            using (var reader = new StreamReader(Request.Body))
            {
                body = await reader.ReadToEndAsync();
            }
            
            var result = _monitoraService.GetArticles(body);

            return Content(await result, MediaTypeNames.Application.Json);
        }

        [Route("czfin/{id}")]
        public async Task<IActionResult> CzFin(string id)
        {
            
            var result = _newsService.LatestNews(id);

            return Content(await result, MediaTypeNames.Application.Json);
        }

    }

}
