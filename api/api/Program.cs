using api.Options;
using api.Services.Abstract;
using api.Services.Concrete;
using Backend.Models;
using dotenv.net;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog.Events;
using Serilog;
using System.Text;
using Azure.Storage;
using Serilog.Sinks.AzureBlobStorage;
using Azure.Storage.Blobs;
using Serilog.Extensions.Hosting;

public class Program
{
    public static void Main(string[] args)
    {
        DotEnv.Load();
        var builder = WebApplication.CreateBuilder(args);
        var configuration = builder.Configuration;
        // Configuration de Serilog
        Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Debug()
            .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
            .Enrich.FromLogContext()
            .WriteTo.Console()
             .WriteTo.AzureBlobStorage(
                new BlobServiceClient(configuration.GetSection("Serilog:WriteTo:AzureBlobStorage:connectionString").Value),
                restrictedToMinimumLevel: LogEventLevel.Verbose,
                storageContainerName: configuration.GetSection("Serilog:WriteTo:AzureBlobStorage:containerName").Value,
                storageFileName: configuration.GetSection("Serilog:WriteTo:AzureBlobStorage:logFileName").Value)
            .CreateLogger();

        builder.Services.AddSingleton(Log.Logger);
        builder.Host.UseSerilog();

        builder.Services.AddControllers();
        var services = builder.Services;

        services.Configure<AzureOptions>(builder.Configuration.GetSection("Azure"));
        services.AddDbContext<Db_Context>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("MyDatabase")));



        services.AddTransient<IImageService, ImageService>();

        services.AddAuthentication(opt =>
        {
            opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
           .AddJwtBearer(options =>
           {
               options.TokenValidationParameters = new TokenValidationParameters
               {
                   ValidateIssuer = true,
                   ValidateAudience = true,
                   ValidateLifetime = true,
                   ValidateIssuerSigningKey = true,
                   ValidIssuer = "http://localhost:4200",
                   ValidAudience = "http://localhost:9070",
                   IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"))
               };
           });

        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "Backend", Version = "v1" });
        });

        var app = builder.Build();

        // Ajouter le middleware
        app.UseRouting();

        app.UseCors(builder =>
        {
            builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
        });
        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });

        app.Run();
    }
}
