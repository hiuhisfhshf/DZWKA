namespace WEB_API.BLL.Services.Auth
{
    public interface IIdentityService
    {
        Task<long> GetUserIdAsync();
    }
}
