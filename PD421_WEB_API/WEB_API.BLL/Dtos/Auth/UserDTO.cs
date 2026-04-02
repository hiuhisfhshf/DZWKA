namespace WEB_API.BLL.Dtos.Auth
{
    public class UserDTO
    {
        public long Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }
}
