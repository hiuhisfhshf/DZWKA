using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using WEB_API.BLL.Dtos.Auth;
using WEB_API.DAL.Entities.Identity;

namespace WEB_API.BLL.Services.Auth;

public class JWTTokenService(IConfiguration configuration,
    UserManager<UserEntity> userManager) : IJWTTokenService
{
    public async Task<TokenDTO> CreateTokenAsync(UserEntity user)
    {
        string key = configuration["JWT:Key"]!;

        var claims = new List<Claim>
        {
            new Claim("email", user.Email ?? ""),
            new Claim("id", user.Id.ToString()),
            new Claim("name", $"{user.FirstName} {user.LastName}"),
            new Claim("image", user.Image != null? user.Image : "")
        };

        foreach (var role in await userManager.GetRolesAsync(user))
        {
            claims.Add(new Claim("role", role));
        }

        var keyBytes = System.Text.Encoding.UTF8.GetBytes(key);
        var signingKey = new SymmetricSecurityKey(keyBytes);

        var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

        var accessToken = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddDays(30),
            signingCredentials: signingCredentials
        );

        string accessTokenString = new JwtSecurityTokenHandler().WriteToken(accessToken);

        return new TokenDTO
        {
            AccessToken = accessTokenString
        };
    }
}
