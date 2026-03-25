using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace WEB_API.BLL.Dtos.Category
{
    public class UpdateCategoryDTO
    {
        public required String Id { get; set; }

        [Required]
        public required String Name { get; set; }

        [Required]

        public required String Description { get; set; }

        public IFormFile? Image { get; set; } = null;

    }
}
