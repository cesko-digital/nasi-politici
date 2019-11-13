using HlidacStatu.NasiPolitici.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HlidacStatu.NasiPolitici.Data
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        { }

        public DbSet<Osoba> Osoby { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    // seed
        //    modelBuilder.Entity<Osoba>().HasData(
        //        new Osoba { 
        //            InternalId = 1,
        //            Jmeno = "Andrej",
        //            Prijmeni = "Babiš",
        //            NameId = "agent-bures",
        //            _SummaryInfoFact = "tady je summary info fact",
        //            _AngazovanostInfoFact = "lorem i psům",
        //            _SponzorInfoFact = "sponzoruje pouze ANO a stát + EU sponzorují Bureše",
        //            _StatInfoFact = "krycí jméno Bureš"
                    
                    
        //        },
        //        new Osoba
        //        {
        //            InternalId = 2,
        //            Jmeno = "",
        //            Prijmeni = ""
        //        }
                
        //    );
        //}
        
    }
}
