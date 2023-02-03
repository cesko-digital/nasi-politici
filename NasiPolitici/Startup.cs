using HlidacStatu.NasiPolitici.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using System;
using System.IO;
using System.Net.Http.Headers;

namespace HlidacStatu.NasiPolitici
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHttpClient<IPoliticianService, PoliticianServiceV2>(config =>
            {
                config.BaseAddress = new Uri(Configuration.GetValue<string>("HlidacApiUrl"));
                config.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Token", Configuration.GetValue<string>("HlidacAuthenticationToken"));
                
                string hlidacHttpTimeoutConfig = Configuration.GetValue<string>("HlidacHttpTimeout");
                
                if (double.TryParse(hlidacHttpTimeoutConfig, out double hlidacHttpTimeout))
                {
                    config.Timeout = TimeSpan.FromMinutes(hlidacHttpTimeout);
                }
            });

            services.AddHttpClient<INewsService, NewsService>(config =>
            {
                config.BaseAddress = new Uri(Configuration.GetValue<string>("CzFinApiUrl"));
            });

            services.AddHttpClient<IDemagogService, DemagogService>(config =>
            {
                config.BaseAddress = new Uri(Configuration.GetValue<string>("DemagogApiUrl"));
            });

            services.AddHttpClient<IMediaService, MediaService>(config =>
            {
                config.BaseAddress = new Uri(Configuration.GetValue<string>("MediaApiUrl"));
            });

            services.Configure<MailConfiguration>(Configuration.GetSection("MailConfiguration"));
            services.AddTransient<IMailService, MailService>();

            services.AddMemoryCache();

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
                app.UseHttpsRedirection();
            }

            app.UseCors(config => 
            {
                config.AllowAnyOrigin();
                config.AllowAnyHeader();
                config.AllowAnyMethod();
            });

            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Content")),
                RequestPath = "/Content"
            });
        }
    }
}
