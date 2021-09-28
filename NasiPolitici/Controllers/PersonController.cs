using HlidacStatu.NasiPolitici.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;
using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Controllers
{
    [ApiController]
    [Route("api/v1/person")]
    public class PersonController : Controller
    {
        class HlidacErrorMsg
        {
            public bool? Valid { get; set; }
            public string Value { get; set; }
            public HlidacError Error { get; set; }
        }

        class HlidacError
        {
            public int Number { get; set; }
            public string Description { get; set; }
            public string ErrorDetail { get; set; }
        }

        private readonly IPoliticianService _politicianService;

        public PersonController(IPoliticianService politicianService)
        {
            _politicianService = politicianService;
        }

        [Route("search/{query}")]
        public async Task<IActionResult> Search(string query, 
            [FromQuery]string place, 
            [FromQuery]string function, 
            [FromQuery]string party)
        {
            if (query.Equals("*"))
                query = "";
            
            var result = await _politicianService.SearchPeople(query, place, function, party);

            return Content(result, MediaTypeNames.Application.Json);
        }

        [Route("detail/{id}")]
        public async Task<IActionResult> Detail(string id)
        {
            var result = await _politicianService.GetPerson(id);

            var parsed = Newtonsoft.Json.JsonConvert.DeserializeObject<HlidacErrorMsg>(result);
            if (parsed.Valid == false)
            {
                return NotFound(parsed.Error.Description);
            }

            return Content(result, MediaTypeNames.Application.Json);
        }

        [Route("count")]
        public async Task<IActionResult> Count()
        {
            var result = await _politicianService.GetPeopleCount();

            return Content(result.ToString(), MediaTypeNames.Application.Json);
        }
        
    }
}