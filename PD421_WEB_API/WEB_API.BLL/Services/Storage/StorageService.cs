using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.Processing;
namespace WEB_API.BLL.Services.Storage;

public class StorageService(IConfiguration configuration) : IStorageService
{

    public async Task<string> SaveImageAsync(byte[] bytes)
    {
        string imageName = $"{Path.GetRandomFileName()}.webp";
        var sizes = configuration.GetRequiredSection("ImageSizes").Get<List<int>>();

        Task[] tasks = sizes
            .AsParallel()
            .Select(s => SaveImageAsync(bytes, imageName, s))
            .ToArray();

        await Task.WhenAll(tasks);

        return imageName;
    }

    private async Task SaveImageAsync(byte[] bytes, string name, int size)
    {
        var path = Path.Combine(StorageOptions.ImagesPath,
            $"{size}_{name}");
        using var image = Image.Load(bytes);
        image.Mutate(async imgConext =>
        {
            imgConext.Resize(new ResizeOptions
            {
                Size = new Size(size, size),
                Mode = ResizeMode.Max
            });
            await image.SaveAsync(path, new WebpEncoder());
        });
    }
    public async Task<string?> SaveImageAsync(IFormFile file)
    {
        try
        {
            using MemoryStream ms = new();
            await file.CopyToAsync(ms);
            var bytes = ms.ToArray();

            var imageName = await SaveImageAsync(bytes);
            return imageName;
        }
        catch (Exception ex)
        {
            Console.WriteLine("EXCEPTION: " + ex.Message);
            return null;
        }
    }

    public async Task<string?> SaveImageAsync(String url)
    {
        try
        {
            using var httpClient = new HttpClient();
            var imageBytes = await httpClient.GetByteArrayAsync(url);
            return await SaveImageAsync(imageBytes);
        }
        catch (Exception ex)
        {
            Console.WriteLine("EXCEPTION: " + ex.Message);
            return null;
        }
    }

    public async Task<IEnumerable<string>> SaveImagesAsync(IEnumerable<IFormFile> files)
    {
        var tasks = files.Select(SaveImageAsync);
        var results = await Task.WhenAll(tasks);
        return results.Where(res => res != null)!;
    }

    public async Task<IEnumerable<string>> SaveImagesAsync(IEnumerable<String> urls)
    {
        var tasks = urls.Select(SaveImageAsync);
        var results = await Task.WhenAll(tasks);
        return results.Where(res => res != null)!;
    }

    public async Task DeleteImageAsync(string imageName)
    {
        var sizes = configuration.GetRequiredSection("ImageSizes").Get<List<int>>();

        Task[] tasks = sizes
            .AsParallel()
            .Select(size =>
            {
                return Task.Run(() =>
                {
                    var path = Path.Combine(StorageOptions.ImagesPath, $"{size}_{imageName}");
                    if (File.Exists(path))
                    {
                        File.Delete(path);
                    }
                });
            })
            .ToArray();

        await Task.WhenAll(tasks);
    }
}