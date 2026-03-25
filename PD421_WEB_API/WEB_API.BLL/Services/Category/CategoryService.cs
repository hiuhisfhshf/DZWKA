using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WEB_API.BLL.Dtos.Category;
using WEB_API.BLL.Services.Category;
using WEB_API.BLL.Services.Storage;
using WEB_API.DAL.Entities.Category;
using WEB_API.DAL.repositories.category;

namespace WEB_API.BLL.Services.Categories
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;
        private readonly IStorageService _storageService;

        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper, IStorageService storageService)
        {
            _mapper = mapper;
            _categoryRepository = categoryRepository;
            _storageService = storageService;
        }

        public async Task<ServerResponse> Create(CreateCategoryDTO dto)
        {
            var entity = _mapper.Map<CategoryEntity>(dto);
            if(dto.Image != null)
            {
                var imagePath = await _storageService.SaveImageAsync(dto.Image);
                if(imagePath == null)
                {
                    return new ServerResponse { Message = "Сталася помилка при збереженні картинки", IsSuccess = false, HttpStatusCode = System.Net.HttpStatusCode.BadRequest };
                }
                entity.Image = imagePath;
            }
            await _categoryRepository.CreateAsync(entity);
            return new ServerResponse { Message = "Успішно створено категорію", IsSuccess = true };
        }
        

        public async Task<ServerResponse> Delete(string id)
        {
            var entity = await _categoryRepository.GetByIdAsync(id);
            if(entity == null)
            {
                return new ServerResponse { Message = "Категорія не знайдена", IsSuccess = false, HttpStatusCode = System.Net.HttpStatusCode.NotFound };
            }
            await _categoryRepository.DeleteAsync(entity);
            return new ServerResponse { Message = "Успішно видалено категорію", IsSuccess = true };
        }

        public async Task<ServerResponse> Update(UpdateCategoryDTO dto)
        {
            var category = await _categoryRepository.GetByIdAsync(dto.Id);
            if (category == null)
            {
                return new ServerResponse
                {
                    Message = "Категорія не знайдена", IsSuccess = false,
                    HttpStatusCode = System.Net.HttpStatusCode.NotFound
                };
            }

            _mapper.Map(dto, category);

            if (dto.Image != null)
            {
                var imagePath = await _storageService.SaveImageAsync(dto.Image);
                if (imagePath == null)
                {
                    return new ServerResponse { Message = "Сталася помилка при збереженні картинки", IsSuccess = false, HttpStatusCode = System.Net.HttpStatusCode.BadRequest };
                }

                if (category.Image != null)
                {
                    await _storageService.DeleteImageAsync(Path.Combine(StorageOptions.ImagesPath,category.Image));
                }
                category.Image = imagePath;
            }

            await _categoryRepository.UpdateAsync(category);
            
            return new ServerResponse { Message = "Успішно оновлено категорію", IsSuccess = true };
        }

        public async Task<ServerResponse> GetAll()
        {
            var categories = await _categoryRepository.GetAll().ToListAsync();
            return new ServerResponse { Message = "Успішно отримано категорії", IsSuccess = true, Data = categories };
        }
    
    }
}
