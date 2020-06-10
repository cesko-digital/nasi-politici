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
        private readonly IMediaService _mediaService;
        private readonly INewsService _newsService;

        public NewsController(IMediaService mediaService, INewsService newsService)
        {
            _mediaService = mediaService;
            _newsService = newsService;
        }

        [HttpGet("media")]
        public async Task<IActionResult> GetMediaArticles(string name, string party, string search_query)
        {
            string body = $@"{{
                ""data"": {{
                    ""name"": ""{name}"",
                    ""party"": ""{party}"",
                    ""search_query"": ""{search_query}""
                }}
            }}";
            
            var result = _mediaService.GetArticles(body);

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
