using Microsoft.AspNetCore.Mvc;

namespace HlidacStatu.NasiPolitici.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
