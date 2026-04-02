using AutoMapper;
using Microsoft.AspNetCore.Identity;
using WEB_API.BLL.Dtos.Auth;
using WEB_API.DAL.Entities.Identity;

namespace WEB_API.BLL.Services.Auth
{
    public class AuthService(IIdentityService identityService,
        UserManager<UserEntity> userManager,
        IMapper mapper) : IAuthService
    {
        public async Task<UserDTO> GetUserInfoAsync()
        {
            var id = await identityService.GetUserIdAsync();
            var user = await userManager.FindByIdAsync(id.ToString());
            var userDto = mapper.Map<UserDTO>(user);

            return userDto;
        }
    }
}
