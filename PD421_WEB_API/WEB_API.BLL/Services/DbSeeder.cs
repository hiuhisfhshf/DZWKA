using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using WEB_API.BLL.Constants;
using WEB_API.BLL.Dtos.User;
using WEB_API.BLL.Services.Storage;
using WEB_API.DAL;
using WEB_API.DAL.Entities.Identity;

namespace WEB_API.BLL.Services;

public static class DbSeeder
{
    public static async Task SeedDataAsync(this WebApplication webApplication)
    {
        using var scope = webApplication.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<RoleEntity>>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<UserEntity>>();
        var env = scope.ServiceProvider.GetRequiredService<IWebHostEnvironment>();
        var storage = scope.ServiceProvider.GetRequiredService<IStorageService>();

        context.Database.Migrate();

        if (!roleManager.Roles.Any())
        {
            var roles = Roles.AllRoles.Select(r => new RoleEntity { Name = r }).ToArray();
            foreach (var role in roles)
            {
                var result = await roleManager.CreateAsync(role);
                if (!result.Succeeded)
                {
                    Console.WriteLine("-----ERROR WHEN CREATING ROLE ", role.Name);
                }
            }
        }

        if (!userManager.Users.Any())
        {
            var json = File.ReadAllText(Path.Combine(env.ContentRootPath,"Helpers","Users.json"));
            var users = JsonConvert.DeserializeObject<List<SeedUserDTO>>(json);
            if(users == null)
            {
                Console.WriteLine("------ JSON FILE NOT FOUND ----------");
            }
            foreach(var user in users)
            {
                var newUser = new UserEntity()
                {
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Image = await storage.SaveImageAsync(user.Image),
                    UserName = user.Email
                };

                var result = await userManager.CreateAsync(newUser, user.Password);
                if (result.Succeeded)
                {
                    await userManager.AddToRolesAsync(newUser, user.Roles);
                }
                else
                {
                    Console.WriteLine("------ ERROR WHEN CREATING USER: ");
                    foreach(var error in result.Errors)
                    {
                        Console.WriteLine(error.Description);
                    }
                }
            }
        }
    }
           
}

