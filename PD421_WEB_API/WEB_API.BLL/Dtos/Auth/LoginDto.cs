using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WEB_API.BLL.Dtos.Auth
{
    public class LoginDTO
    {
        public String? Email { get; set; }
        public String? Password { get; set; }
    }
}
