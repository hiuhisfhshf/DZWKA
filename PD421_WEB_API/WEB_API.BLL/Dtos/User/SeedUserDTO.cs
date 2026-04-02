using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WEB_API.DAL.Entities.Identity;

namespace WEB_API.BLL.Dtos.User
{
    public class SeedUserDTO
    {
        public required string Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Image { get; set; }

        public required string Password { get; set; }

        public List<String> Roles { get; set; }
    }
}
