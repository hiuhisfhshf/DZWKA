using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WEB_API.BLL.Dtos.Auth;
using WEB_API.DAL.Entities.Identity;

namespace WEB_API.BLL.Services.Auth
{
    public interface IJWTTokenService
    {
        Task<TokenDTO> CreateTokenAsync(UserEntity user);
    }
}
