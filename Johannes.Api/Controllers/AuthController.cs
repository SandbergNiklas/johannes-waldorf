using Johannes.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Johannes.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;

        public AuthController(IConfiguration config)
        { 
            _config = config;
        }
        [HttpPost("login")]
        [EnableRateLimiting("login")]
        public ActionResult<string> Login([FromBody]LoginRequest request)
        {
            var adminUsername = _config["AdminCredentials:Username"];
            var adminPassword = _config["AdminCredentials:Password"];

            if (string.IsNullOrEmpty(adminUsername) || string.IsNullOrEmpty(adminPassword))
            {
                return StatusCode(500, "Server config error");
            }
            if (!string.Equals(request.Username, adminUsername) || !string.Equals(request.Password, adminPassword))
            { 
                return Unauthorized();            
            }
            var token = GenerateToken(request.Username);
            return Ok(new { token });
            
        }
        private string GenerateToken(string userName){ 
            var jwtKey = _config["Jwt:Key"]
            ?? throw new InvalidOperationException("Jwt:Key saknas i konfigurationen");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, userName),
                new Claim(ClaimTypes.Role, "Admin")
            };
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
                );
            return new JwtSecurityTokenHandler().WriteToken(token);

        }
    }
}
