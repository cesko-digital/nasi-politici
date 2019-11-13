using HlidacStatu.NasiPolitici.Data;
using HlidacStatu.NasiPolitici.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace HlidacStatu.NasiPolitici.Controllers
{
    public class PolitikController: Controller
    {
        private readonly ILogger<PolitikController> _logger;
        private readonly DataContext _context;

        public PolitikController(ILogger<PolitikController> logger, DataContext context )
        {
            _logger = logger;
            _context = context;
        }

        public async Task<IActionResult> Politik(string id)
        {
            
            if (string.IsNullOrWhiteSpace(id))
                return NotFound();

            PolitikViewModel viewModel = new PolitikViewModel();

            viewModel.Osoba = await _context.Osoby.Where(os => os.NameId == id).FirstOrDefaultAsync();


            return View(viewModel);
        }
    }
}
