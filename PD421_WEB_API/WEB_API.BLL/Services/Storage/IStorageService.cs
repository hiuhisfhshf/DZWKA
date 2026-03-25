using Microsoft.AspNetCore.Http;
namespace WEB_API.BLL.Services.Storage
{
    public interface IStorageService
    {
        Task<string?> SaveImageAsync(IFormFile file);
        Task<IEnumerable<string>> SaveImagesAsync(IEnumerable<IFormFile> files);
        Task DeleteImageAsync(string folderPath);
    }
}
