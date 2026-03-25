
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using WEB_API.BLL.Services.Categories;
using WEB_API.BLL.Services.Category;
using WEB_API.BLL.Services.Storage;
using WEB_API.Controllers.Category;
using WEB_API.DAL;
using WEB_API.DAL.repositories.category;
using WEB_API.DAL.Repositories.Category;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOriginPolicy",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<ICategoryService,CategoryService>();
builder.Services.AddSingleton<IStorageService, StorageService>();

builder.Services.AddAutoMapper(cfg =>
{
    cfg.LicenseKey = builder.Configuration.GetConnectionString("AutoMapperKey");

}, AppDomain.CurrentDomain.GetAssemblies());
var app = builder.Build();
app.UseCors("AllowAnyOriginPolicy");

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}

var path = Path.Combine(builder.Environment.ContentRootPath, "Images");
Directory.CreateDirectory(path);

StorageOptions.ImagesPath = path;

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(path),
    RequestPath = "/category-images"
});


//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
context.Database.Migrate();


app.Run();
