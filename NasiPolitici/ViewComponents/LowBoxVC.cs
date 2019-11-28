using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.ViewComponents
{
    public class LowBoxVC : ViewComponent
    {
        public Task<IViewComponentResult> InvokeAsync(
        int width, string content, string gaPageEventId = null)
        {
            if (gaPageEventId == null)
            {
                gaPageEventId = "";
            }

            (string content, int width) model = (content, width);
            return Task.FromResult(View(model) as IViewComponentResult);
        }
    }
}
