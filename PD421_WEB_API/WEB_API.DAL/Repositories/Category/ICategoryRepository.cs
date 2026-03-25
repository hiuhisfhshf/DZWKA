using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WEB_API.DAL.Entities.Category;

namespace WEB_API.DAL.repositories.category
{
    public interface ICategoryRepository
       :IGenericRepository<CategoryEntity, string>
    {

    }
}
