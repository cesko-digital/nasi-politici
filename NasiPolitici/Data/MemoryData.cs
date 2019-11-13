using HlidacStatu.NasiPolitici.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Data
{
    public class MemoryData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {

            using(var context = new DataContext(
                serviceProvider.GetRequiredService<DbContextOptions<DataContext>>()) )
            {
                if (!context.Osoby.Any())
                {
                    context.Osoby.AddRange(
                        new Osoba
                        {
                            InternalId = 1,
                            Jmeno = "Andrej",
                            Prijmeni = "Babiš",
                            NameId = "agent-bures",
                            _SummaryInfoFact = "tady je summary info fact",
                            _AngazovanostInfoFact = "lorem i psům",
                            _SponzorInfoFact = "sponzoruje pouze ANO a stát + EU sponzorují Bureše",
                            _StatInfoFact = "krycí jméno Bureš",
                            _FunkceOsoba = @"<p>poslanec (od 2017) - Poslanecká sněmovna PČR (2017 - 2021)</p>
                                <p>poslanec (od 2013 do 2017) - Poslanecká sněmovna PČR (2013 - 2017)</p>
                                <p>premiér (od 2017) - Vláda České republiky</p>
                                <p>1. místopředseda (od 2014 do 2017) - Vláda České republiky</p>
                                <p>ministr (od 2014 do 2017) - Vláda ČR (min. předseda Bohuslav Sobotka) - Ministerstvo financí</p>
                                <p>kandidát (od 2017) - ANO 2011</p>
                                <p>kandidát (od 2013) - ANO 2011 (ANO)</p>
                                <p>člen (od 2013 do 2017) - Poslanecký klub ANO 2011</p>
                                <p>předseda (od 2012) - ANO 2011, o.s.</p>
                                <p>předseda (od 2012) - Předsednictvo</p>
                                <p>zakladatel (od 2011) - ANO 2011, o.s.</p>
                                <p>člen (od 1980) - KSČ</p>
                                <p>člen (od 1980) - Komunistická strana Slovenska</p>
                                <p>člen (od 2017) - Kontrolní výbor - Poslanecká sněmovna PČR (2013 - 2017)</p>
                                <p>člen (od 2013 do 2014) - Rozpočtový výbor - Poslanecká sněmovna PČR (2013 - 2017)</p>"


                        },
                        new Osoba
                        {
                            InternalId = 2,
                            Jmeno = "",
                            Prijmeni = ""
                        });
                }

                context.SaveChanges();
            }

        }

    }
}
