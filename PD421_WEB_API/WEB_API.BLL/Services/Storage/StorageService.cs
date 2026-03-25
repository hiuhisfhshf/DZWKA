using Microsoft.AspNetCore.Http;
namespace WEB_API.BLL.Services.Storage
{
    public class StorageService : IStorageService
    {
        public async Task<string?> SaveImageAsync(IFormFile file)
        {
            try
            {
                var types = file.ContentType.Split('/');
                if (types.Length != 2 || types[0] != "image")
                {
                    Console.WriteLine("BAD IMAGE");
                    return null;
                }

                string baseFolder = Path.Combine(StorageOptions.ImagesPath);
                Directory.CreateDirectory(baseFolder);
                string extension = Path.GetExtension(file.FileName);
                string imageName = $"{Guid.NewGuid()}{extension}";
                string imagePath = Path.Combine(baseFolder, imageName);

                using (var stream = File.Create(imagePath))
                {
                    await file.CopyToAsync(stream);
                }
                return imageName;
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

        public async Task DeleteImageAsync(string imagePath)
        {
            Console.WriteLine(imagePath);
            if (File.Exists(imagePath))
            {
                try
                {
                    await Task.Run(() =>
                    {
                        File.Delete(imagePath);
                    });
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }
    }
}
