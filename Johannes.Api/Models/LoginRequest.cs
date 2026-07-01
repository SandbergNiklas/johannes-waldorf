using System.ComponentModel.DataAnnotations;

namespace Johannes.Api.Models
{
    public class LoginRequest
    {
        [Required, EmailAddress]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
