using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.Ressources.Login
{
    
    public class LoginModel
    {
        public string? login { get; set; }
        public string? Password { get; set; }
    }
    public class AuthenticatedResponse
    {
        public string? Token { get; set; }
    }
}
