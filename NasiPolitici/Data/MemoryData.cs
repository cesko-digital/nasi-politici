﻿using HlidacStatu.NasiPolitici.Models;
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
                            NameId = "andrej-babis",
                            Narozeni = new DateTime(1954,1,1),
                            _SummaryInfoFact = "Andrej Babiš (*1954 ),poslanec (od 2017) - Poslanecká sněmovna PČR (2017 - 2021) poslanec (od 2013 do 2017) - Poslanecká sněmovna PČR (2013 - 2017).",
                            _AngazovanostInfoFact = "205 firem, ve kterých se angažuje, v roce 2019 získaly zakázky za celkem 17 mld. Kč.",
                            _SponzorInfoFact = "Andrej Babiš mezi roky 2012-18 sponzoroval 2 polit. strany v celkové výši 19 mil. Kč. Nejvyšší sponzorský dar byl ve výši 3 mil. Kč.",
                            _StatInfoFact = "Angažoval se v 2 státních firmách. Angažoval se také v 205 soukr.firmách, tyto firmy získaly od státu od 2016 celkem 5069 smluv v celkové výši 53 mld. Kč.",
                            _FunkceOsoba = @"poslanec (od 2017) - Poslanecká sněmovna PČR (2017 - 2021)<br />
                                poslanec (od 2013 do 2017) - Poslanecká sněmovna PČR (2013 - 2017)<br />
                                premiér (od 2017) - Vláda České republiky<br />
                                1. místopředseda (od 2014 do 2017) - Vláda České republiky<br />
                                ministr (od 2014 do 2017) - Vláda ČR (min. předseda Bohuslav Sobotka) - Ministerstvo financí<br />
                                kandidát (od 2017) - ANO 2011<br />
                                kandidát (od 2013) - ANO 2011 (ANO)<br />
                                člen (od 2013 do 2017) - Poslanecký klub ANO 2011<br />
                                předseda (od 2012) - ANO 2011, o.s.<br />
                                předseda (od 2012) - Předsednictvo<br />
                                zakladatel (od 2011) - ANO 2011, o.s.<br />
                                člen (od 1980) - KSČ<br />
                                člen (od 1980) - Komunistická strana Slovenska<br />
                                člen (od 2017) - Kontrolní výbor - Poslanecká sněmovna PČR (2013 - 2017)<br />
                                člen (od 2013 do 2014) - Rozpočtový výbor - Poslanecká sněmovna PČR (2013 - 2017)<br />",
                            _Sponzoring = @"Sponzor ANO v 2018, hodnota daru 50 000 Kč (<a target=""_blank"" href=""https://udhpsh.cz/5290-2/""><span class=""text-muted"" title=""Jedná se o peněžní nebo nepeněžní dar"" alt=""Jedná se o peněžní nebo nepeněžní dar""><span class=""glyphicon glyphicon-link"" aria-hidden=""true""></span> zdroj</span></a>) <br />
                                Sponzor ANO v 2018, hodnota daru 19 400 Kč (<a target=""_blank"" href=""https://udhpsh.cz/5290-2/""><span class=""text-muted"" title=""Jedná se o peněžní nebo nepeněžní dar"" alt=""Jedná se o peněžní nebo nepeněžní dar""><span class=""glyphicon glyphicon-link"" aria-hidden=""true""></span> zdroj</span></a>) <br />
                                Sponzor ANO v 2017, hodnota daru 500 000 Kč (<a target=""_blank"" href=""https://udhpsh.cz/5290-2/""><span class=""text-muted"" title=""Jedná se o peněžní nebo nepeněžní dar"" alt=""Jedná se o peněžní nebo nepeněžní dar""><span class=""glyphicon glyphicon-link"" aria-hidden=""true""></span> zdroj</span></a>) <br />
                                Sponzor ANO v 2017, hodnota daru 5 082 Kč (<a target=""_blank"" href=""https://udhpsh.cz/5290-2/""><span class=""text-muted"" title=""Jedná se o peněžní nebo nepeněžní dar"" alt=""Jedná se o peněžní nebo nepeněžní dar""><span class=""glyphicon glyphicon-link"" aria-hidden=""true""></span> zdroj</span></a>) <br />
                                Sponzor ANO v 2017, hodnota daru 50 000 Kč (<a target=""_blank"" href=""https://udhpsh.cz/5290-2/""><span class=""text-muted"" title=""Jedná se o peněžní nebo nepeněžní dar"" alt=""Jedná se o peněžní nebo nepeněžní dar""><span class=""glyphicon glyphicon-link"" aria-hidden=""true""></span> zdroj</span></a>) <br />
                                Sponzor ANO 2011 v 2016, hodnota daru 50 000 Kč (<a target=""_blank"" href=""https://www.hlidacstatu.cz/ucty/transakce/E0240468669B1CB5493A2475DA477597""><span class=""text-muted"" title=""Jedná se o peněžní nebo nepeněžní dar"" alt=""Jedná se o peněžní nebo nepeněžní dar""><span class=""glyphicon glyphicon-link"" aria-hidden=""true""></span> zdroj</span></a>) <br />",
                            _InsolvenceOsoba = new List<Insolvence>(),
                            _InsolvenceFirma = new List<Insolvence>
                            {
                                new Insolvence
                                {
                                    Id = 1,
                                    Key = "věřitel",
                                    Value = 528
                                },
                                new Insolvence
                                {
                                    Id = 2,
                                    Key = "dlužník",
                                    Value = 528
                                }
                            },
                            _Oznameni = new List<Oznameni>
                            {
                                new Oznameni
                                {
                                    Id = "aa3b2107-9e88-44ce-a58f-55026df30c84",
                                    Osoba = "Ing. Jan Lisa",
                                    Organizace ="Město Lovosice",
                                    Funkce = "člen Rady"
                                },
                                new Oznameni
                                {
                                    Id = "e03d2a9c-044f-42c8-93ff-30d2fc439e54",
                                    Osoba = "Andrej Babiš",
                                    Organizace ="Úřad vlády ČR, Kancelář Poslanecké sněmovny Parlamentu České republiky",
                                    Funkce = "člen vlády, poslanec"
                                },
                                new Oznameni
                                {
                                    Id = "9011c499-d879-4556-b162-09dcd5c67d10",
                                    Osoba = "Ing. Jiří Hladký",
                                    Organizace ="Obec Záhornice",
                                    Funkce = "starosta"
                                },
                                new Oznameni
                                {
                                    Id = "4aa2166f-133b-401c-97db-bd007eb3d7f6",
                                    Osoba = "Ing. František Turek",
                                    Organizace ="Obec Načešice",
                                    Funkce = "starosta"
                                },
                                new Oznameni
                                {
                                    Id = "d1a96d79-9885-43ca-92a4-214c61f7d55f",
                                    Osoba = "Ing. Jiří Haspeklo",
                                    Organizace ="Město Benátky nad Jizerou",
                                    Funkce = "místostarosta / zástupce starosty, člen Rady"
                                }
                            }
                        },
                        new Osoba
                        {
                            InternalId = 2,
                            Jmeno = "Richard",
                            Prijmeni = "Brabec",
                            NameId = "richard-brabec",
                            Narozeni = new DateTime(1966,1,1),
                            _SummaryInfoFact = "Richard Brabec (*1966 ),poslanec (od 2017) - Poslanecká sněmovna PČR (2017 - 2021) poslanec (od 2013 do 2017) - Poslanecká sněmovna PČR (2013 - 2017).",
                            _SponzorInfoFact = "Richard Brabec mezi roky 2012-17 sponzoroval ANO 2011 v celkové výši 6 mil. Kč. Nejvyšší sponzorský dar byl ve výši 6 mil. Kč.",
                            _FunkceOsoba = @"poslanec (od 2017) - Poslanecká sněmovna PČR (2017 - 2021)<br />
                                poslanec (od 2013 do 2017) - Poslanecká sněmovna PČR (2013 - 2017)<br />
                                zastupitel (od 2000 do 2004) - Zastupitelstvo Středočeského kraje<br />
                                zastupitel (do 1998) - Zastupitelstvo města Kladna<br />
                                1. místopředseda (od 2017) - Vláda České republiky<br />
                                1. místopředseda (od 2017) - Vláda České republiky<br />
                                ministr (od 2017) - Vláda ČR (min. předseda Andrej Babiš) - Ministerstvo životního prostředí<br />
                                ministr (od 2014 do 2017) - Vláda ČR (min. předseda Bohuslav Sobotka) - Ministerstvo životního prostředí<br />
                                místopředseda (od 2017) - ANO 2011, o.s.<br />
                                kandidát (od 2017) - ANO 2011<br />
                                člen (od 2017) - Poslanecký klub ANO 2011<br />
                                člen (od 2015) - Předsednictvo<br />
                                kandidát (od 2014) - ANO 2011<br />
                                kandidát (od 2013) - ANO 2011 (ANO)<br />
                                člen (od 2013 do 2017) - Poslanecký klub ANO 2011<br />
                                manažer (od 2012) - ANO 2011, o.s.<br />
                                člen (od 2012) - ANO 2011, o.s.<br />
                                kandidát (od 2004) - KOAL_STČ<br />
                                nezávislý kandidát (od 2002) - Unie svobody-Demokratická unie<br />
                                kandidát (od 2002) - US-DEU<br />",
                            _Sponzoring = @"Sponzor ANO v 2017, hodnota daru 50 000 Kč <a target=""_blank"" href=""https://udhpsh.cz/5290-2/""><span class=""text-muted"" title=""Jedná se o peněžní nebo nepeněžní dar"" alt=""Jedná se o peněžní nebo nepeněžní dar"">(<span class=""glyphicon glyphicon-link"" aria-hidden=""true""></span>zdroj</span>)</a> <br />
                                Sponzor ANO v 2017, hodnota daru 50 000 Kč <a target=""_blank"" href=""https://udhpsh.cz/5290-2/""><span class=""text-muted"" title=""Jedná se o peněžní nebo nepeněžní dar"" alt=""Jedná se o peněžní nebo nepeněžní dar"">(<span class=""glyphicon glyphicon-link"" aria-hidden=""true""></span>zdroj</span>)</a> <br />
                                Sponzor ANO 2011 v 2016, hodnota daru 50 000 Kč <a target=""_blank"" href=""https://www.hlidacstatu.cz/ucty/transakce/7C36B39977B6999EF0B15BC669A54074""><span class=""text-muted"" title=""Jedná se o peněžní nebo nepeněžní dar"" alt=""Jedná se o peněžní nebo nepeněžní dar"">(<span class=""glyphicon glyphicon-link"" aria-hidden=""true""></span>zdroj</span>)</a> <br />
                                Sponzor ANO 2011 v 2015, hodnota daru 50 000 Kč <br />
                                Lovochemie, a.s. sponzor ANO 2011 (R. Brabec člen dozorčí rady 14. 7. 2011 - 31. 1. 2014) v 2012, hodnota daru 6 000 000 Kč <a target=""_blank"" href=""http://www.politickefinance.cz/www/data_load/donations.csv#37072""><span class=""text-muted"" title=""Jedná se o peněžní nebo nepeněžní dar"" alt=""Jedná se o peněžní nebo nepeněžní dar"">(<span class=""glyphicon glyphicon-link"" aria-hidden=""true""></span>zdroj</span>)</a> <br />",
                            _InsolvenceOsoba = new List<Insolvence>(),
                            _InsolvenceFirma = new List<Insolvence>(),
                            _Oznameni = new List<Oznameni>
                            {
                                new Oznameni
                                {
                                    Id = "3c4b6bb5-6648-457e-8492-4ce7f9776ce9",
                                    Osoba = "Richard Brabec",
                                    Organizace ="Kancelář Poslanecké sněmovny Parlamentu České republiky, Ministerstvo životního prostředí",
                                    Funkce = "poslanec, člen vlády"
                                }
                            }
                        },
                        new Osoba
                        {
                            InternalId = 3,
                            Jmeno = "Milan",
                            Prijmeni = "Feranec",
                            NameId = "milan-feranec",
                            Narozeni = new DateTime(1964, 1, 1),
                            _SummaryInfoFact = "Milan Feranec (*1964 )",
                            _AngazovanostInfoFact = "3 firem, ve kterých se angažuje, v roce 2019 získaly zakázky za celkem 33 mil. Kč.",
                            _SponzorInfoFact = "Milan Feranec mezi roky 2014-18 sponzoroval 2 polit. strany v celkové výši 505 000 Kč. Nejvyšší sponzorský dar byl ve výši 99 000 Kč.",
                            _StatInfoFact = "Angažoval se v 2 státních firmách. Angažoval se také v 205 soukr.firmách, tyto firmy získaly od státu od 2016 celkem 5069 smluv v celkové výši 53 mld. Kč.",
                            _Sponzoring = @"Sponzor ANO v 2018, hodnota daru 99 000 Kč (<a target=""_blank"" href=""https://udhpsh.cz/5290-2/""><span class=""text-muted"" title=""Jedná se o peněžní nebo nepeněžní dar"" alt=""Jedná se o peněžní nebo nepeněžní dar""><span class=""glyphicon glyphicon-link"" aria-hidden=""true""></span> zdroj</span></a>) <br />
                                Sponzor ANO v 2018, hodnota daru 90 000 Kč (<a target=""_blank"" href=""https://udhpsh.cz/5290-2/""><span class=""text-muted"" title=""Jedná se o peněžní nebo nepeněžní dar"" alt=""Jedná se o peněžní nebo nepeněžní dar""><span class=""glyphicon glyphicon-link"" aria-hidden=""true""></span> zdroj</span></a>) <br />
                                Sponzor ANO v 2018, hodnota daru 60 000 Kč (<a target=""_blank"" href=""https://udhpsh.cz/5290-2/""><span class=""text-muted"" title=""Jedná se o peněžní nebo nepeněžní dar"" alt=""Jedná se o peněžní nebo nepeněžní dar""><span class=""glyphicon glyphicon-link"" aria-hidden=""true""></span> zdroj</span></a>) <br />
                                Sponzor ANO v 2018, hodnota daru 20 000 Kč (<a target=""_blank"" href=""https://udhpsh.cz/5290-2/""><span class=""text-muted"" title=""Jedná se o peněžní nebo nepeněžní dar"" alt=""Jedná se o peněžní nebo nepeněžní dar""><span class=""glyphicon glyphicon-link"" aria-hidden=""true""></span> zdroj</span></a>) <br />
                                Sponzor ANO v 2017, hodnota daru 90 000 Kč (<a target=""_blank"" href=""https://udhpsh.cz/5290-2/""><span class=""text-muted"" title=""Jedná se o peněžní nebo nepeněžní dar"" alt=""Jedná se o peněžní nebo nepeněžní dar""><span class=""glyphicon glyphicon-link"" aria-hidden=""true""></span> zdroj</span></a>) <br />
                                Sponzor ANO v 2017, hodnota daru 51 000 Kč (<a target=""_blank"" href=""https://udhpsh.cz/5290-2/""><span class=""text-muted"" title=""Jedná se o peněžní nebo nepeněžní dar"" alt=""Jedná se o peněžní nebo nepeněžní dar""><span class=""glyphicon glyphicon-link"" aria-hidden=""true""></span> zdroj</span></a>) <br />",
                            _InsolvenceOsoba = new List<Insolvence>(),
                            _InsolvenceFirma = new List<Insolvence>
                            {
                                new Insolvence
                                {
                                    Id = 3,
                                    Key = "věřitel",
                                    Value = 767
                                }
                            },
                            _Oznameni = new List<Oznameni>
                            {
                                new Oznameni
                                {
                                    Id = "4a8fbee9-2075-477d-b224-fb3c5fa5a1d9",
                                    Osoba = @"<a href=""https://cs.wikipedia.org/wiki/Milan_Feranec"">Mgr. Milan Feranec</a>",
                                    Organizace = "Kancelář Poslanecké sněmovny Parlamentu České republiky, Statutární město Olomouc, Ministerstvo dopravy",
                                    Funkce = "poslanec, člen Rady, náměstek pro řízení sekce"
                                },
                                new Oznameni
                                {
                                    Id = "d8046e45-1520-47e6-b389-f58c92039b94",
                                    Osoba = "Bc. Miroslav Petřík",
                                    Organizace = "Statutární město Olomouc",
                                    Funkce = "člen Rady"
                                },
                                new Oznameni
                                {
                                    Id = "9ec64af1-202b-452b-ac1d-e275e32e179d",
                                    Osoba = "Jiří Švachula",
                                    Organizace = "Statutární město Brno MČ Brno-střed, Úřad městské části Brno-střed",
                                    Funkce = "místostarosta / zástupce starosty, člen zastupitelstva"
                                },
                                new Oznameni
                                {
                                    Id = "49d45fcf-f813-41da-8f66-5abf74fb8b67",
                                    Osoba = "Mgr. Roman Zarzycký",
                                    Organizace = "Plzeň, statutární město, Městský obvod Plzeň 1",
                                    Funkce = "člen zastupitelstva, místostarosta / zástupce starosty, člen Rady"
                                },
                                new Oznameni
                                {
                                    Id = "d93aef47-f922-4687-b8cc-6f9d028217ae",
                                    Osoba = "Jan  Nečas",
                                    Organizace = "Jihomoravský kraj, Regionální rada regionu soudržnosti Jihovýchod",
                                    Funkce = "člen zastupitelstva, člen řídícího orgánu"
                                }
                            }
                        },
                        new Osoba
                        {
                            InternalId = 4,
                            Jmeno = "Miroslav",
                            Prijmeni = "Kalousek",
                            NameId = "miroslav-kalousek",
                            Narozeni = new DateTime(1960, 1, 1),
                            _SummaryInfoFact = "Miroslav Kalousek(*1960), poslanec (od 2013) - Poslanecká sněmovna PČR (2013 - 2017) poslanec (od 2010 do 2013) - Poslanecká sněmovna PČR (2010 - 2013).",
                            _SponzorInfoFact = "Miroslav Kalousek mezi roky 2014-17 sponzoroval TOP 09 v celkové výši 400 000 Kč. Nejvyšší sponzorský dar byl ve výši 300 000 Kč.",
                            _FunkceOsoba = @"poslanec (od 2013) - Poslanecká sněmovna PČR (2013 - 2017)<br />
                                poslanec (od 2010 do 2013) - Poslanecká sněmovna PČR (2010 - 2013)<br />
                                poslanec (od 2006 do 2010) - Poslanecká sněmovna PČR (2006 - 2010)<br />
                                zastupitel (od 2006 do 2010) - Zastupitelstvo města Bechyně<br />
                                poslanec (od 2002 do 2006) - Poslanecká sněmovna PČR (2002 - 2006)<br />
                                poslanec (od 1998 do 2002) - Poslanecká sněmovna PČR (1998 - 2002)<br />
                                ministr (od 2010 do 2013) - Vláda ČR (min. předseda Petr Nečas) - Ministerstvo financí<br />
                                ministr (od 2007 do 2009) - Vláda ČR (min. předseda Mirek Topolánek) - Ministerstvo financí<br />
                                předseda (od 2015 do 2017) - TOP 09<br />
                                kandidát (od 2014) - Nezávislí a TOP 09<br />
                                kandidát (od 2013) - TOP 09<br />
                                předseda (od 2013) - Poslanecký klub TOP 09 a Starostové<br />
                                kandidát (od 2010) - TOP 09 (ve spolupráci se Starosty a nezávislými)<br />
                                člen (od 2010 do 2013) - Poslanecký klub TOP 09 a Starostové<br />
                                člen (od 2009) - TOP 09<br />
                                1. místopředseda (od 2009 do 2015) - Předsednictvo<br />
                                1. místopředseda (od 2009 do 2015) - TOP 09<br />
                                kandidát (od 2009) - TOP 09 (ve spolupráci s hnutím Starostové a nezávislí)<br />
                                předseda (od 2006) - Poslanecký klub Křesťanské a demokratické unie-Československé strany lidové<br />
                                člen (od 2006 do 2009) - Poslanecký klub Křesťanské a demokratické unie-Československé strany lidové<br />",
                            _Sponzoring = @"Sponzor TOP 09 v 2017, hodnota daru 300 000 Kč (<a target=""_blank"" href=""https://udhpsh.cz/5290-2/""><span class=""text-muted"" title=""Jedná se o peněžní nebo nepeněžní dar"" alt=""Jedná se o peněžní nebo nepeněžní dar""><span class=""glyphicon glyphicon-link"" aria-hidden=""true""></span> zdroj</span></a>) <br />
                                Sponzor TOP 09 v 2014, hodnota daru 100 000 Kč (<a target=""_blank"" href=""https://udhpsh.cz/5290-2/""><span class=""text-muted"" title=""Jedná se o peněžní nebo nepeněžní dar"" alt=""Jedná se o peněžní nebo nepeněžní dar""><span class=""glyphicon glyphicon-link"" aria-hidden=""true""></span> zdroj</span></a>) <br />",
                            _InsolvenceOsoba = new List<Insolvence>(),
                            _InsolvenceFirma = new List<Insolvence>(),
                            _Oznameni = new List<Oznameni>
                            {
                                new Oznameni
                                {
                                    Id = "9593b9a2-db48-48b6-84d6-34e1727a47f2",
                                    Osoba = @"<a href=""https://cs.wikipedia.org/wiki/Miroslav_Kalousek"">Miroslav Kalousek</a>",
                                    Organizace ="Kancelář Poslanecké sněmovny Parlamentu České republiky",
                                    Funkce = "poslanec"
                                }
                            }
                        });
                }

                context.SaveChanges();
            }

        }

    }
}
