using HlidacStatu.NasiPolitici.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;
using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Controllers
{
    [ApiController]
    [Route("api/v1/demagog")]
    public class DemagogController : Controller
    {
        private readonly IDemagogService _demagogService;

        public DemagogController(IDemagogService demagogService)
        {
            _demagogService = demagogService;
        }

        [Route("{osobaId}")]
        public async Task<IActionResult> GetStats(string osobaId)
        {
            var uid = new UniversalId()
            {
                OsobaId = osobaId
            };
            var result = _demagogService.GetStats(uid);

            return Content(await result, MediaTypeNames.Application.Json);
        }

        [HttpPost]
        public async Task<IActionResult> GetStatsV2(UniversalId universalId)
        {
            var result = _demagogService.GetStats(universalId);

            return Content(await result, MediaTypeNames.Application.Json);
        }

    }
        
}
