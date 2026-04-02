using Microsoft.AspNetCore.Http;
namespace WEB_API.BLL.Services.Storage
{
    public interface IStorageService
    {
        Task<string?> SaveImageAsync(IFormFile file);

        Task<string?> SaveImageAsync(String url);
        Task<IEnumerable<string>> SaveImagesAsync(IEnumerable<IFormFile> files);

        Task<IEnumerable<string>> SaveImagesAsync(IEnumerable<String> urls);
        Task DeleteImageAsync(string imageName);
    }
}
