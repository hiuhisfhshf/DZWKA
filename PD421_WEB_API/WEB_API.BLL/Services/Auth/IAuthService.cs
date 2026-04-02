using WEB_API.BLL.Dtos.Auth;

namespace WEB_API.BLL.Services.Auth
{
    public interface IAuthService
    {
        Task<UserDTO> GetUserInfoAsync();
    }
}
