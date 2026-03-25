using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WEB_API.DAL.Entities.Category;
using WEB_API.DAL.repositories;
using WEB_API.DAL.repositories.category;

namespace WEB_API.DAL.Repositories.Category
{
    public class CategoryRepository
        : GenericRepository<CategoryEntity, String>, ICategoryRepository
    {
       public CategoryRepository(AppDbContext context)
    : base(context) { }
    }
}
