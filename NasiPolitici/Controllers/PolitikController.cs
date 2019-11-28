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
        private readonly IDataContext _context;

        public PolitikController(ILogger<PolitikController> logger, IDataContext context)
        {
            _logger = logger;
            _context = context;
        }
    }
}
