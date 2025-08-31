using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BugTracker.Core.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace BugTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("login")]
      
        public IActionResult Login([FromBody] LoginRequest request)
        {
    
            // Simulated user validation (replace with real logic later)
            if (request.UserName == "admin" && request.Password == "password")
            {
                var jwtConfig = _configuration.GetSection("JWT");
                var key = jwtConfig["Key"];
                var issuer = jwtConfig["Issuer"];
                var audience = jwtConfig["Audience"];

                if (string.IsNullOrWhiteSpace(key))
                    throw new InvalidOperationException("JWT Key is missing from configuration");

                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var claims = new[]
                {
                    new Claim(ClaimTypes.Name, request.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                var expiration = DateTime.UtcNow.AddHours(1);

                var token = new JwtSecurityToken(
                    issuer: issuer,
                    audience: audience,
                    claims: claims,
                    expires: expiration,
                    signingCredentials: credentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

                return Ok(new AuthResponse
                {
                    Token = tokenString,
                    Expiration = expiration
                });
            }

            return Unauthorized("Invalid credentials");
        }

       
    }
}