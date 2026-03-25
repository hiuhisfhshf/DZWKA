using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WEB_API.BLL;
using WEB_API.BLL.Dtos.Category;
using WEB_API.BLL.Services.Categories;
using WEB_API.BLL.Services.Category;

namespace WEB_API.Controllers.Category
{
    [Route("api/categories")]
    [ApiController]


    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public CategoryController(ICategoryService categoryService, IWebHostEnvironment webHostEnvironment)
        {
            _categoryService = categoryService;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet]
        public async Task<ServerResponse> GetAll()
        {
            return await _categoryService.GetAll();
        }

        [HttpPost]
        public async Task<ServerResponse> Create([FromForm] CreateCategoryDTO dto)
        {
            return await _categoryService.Create(dto);
        }

        [HttpDelete("{id}")]
        public async Task<ServerResponse> Delete(string id)
        {
            return await _categoryService.Delete(id);
        }

        [HttpPut]
        public async Task<ServerResponse> Update([FromForm] UpdateCategoryDTO dto)
        {
            return await _categoryService.Update(dto);
        }
    }
}
