using BugTracker.Core.DTOs;
using BugTracker.Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BugTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthController> _logger;
        private static List<User> _users = new();
        private readonly PasswordHasher<User> _passwordHasher;

        public AuthController(IConfiguration configuration, ILogger<AuthController> logger, PasswordHasher<User> passwordHasher)
        {
            _configuration = configuration;
            _logger = logger;
            _passwordHasher = passwordHasher;
        }

        // REGISTER USER
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (_users.Any(u => u.Username.ToLower() == request.Username.ToLower()))
                {
                    _logger.LogWarning("Registration attempt with existing username: {Username}", request.Username);
                    return BadRequest(new ErrorResponse
                    {
                        Message = "Username already exists",
                        CorrelationId = HttpContext.TraceIdentifier
                    });
                }

                // Validate role
                var validRoles = new[] { "Admin", "Developer", "Tester" };
                if (!validRoles.Contains(request.Role))
                {
                    return BadRequest(new ErrorResponse
                    {
                        Message = "Invalid role. Valid roles are: Admin, Developer, Tester",
                        CorrelationId = HttpContext.TraceIdentifier
                    });
                }

                var passwordHash = _passwordHasher.HashPassword(null, request.Password);

                var user = new User
                {
                    Username = request.Username,
                    Role = request.Role,
                    PasswordHash = passwordHash
                };

                _users.Add(user);
                _logger.LogInformation("User registered successfully: {Username} with role: {Role}", user.Username, user.Role);

                return Ok(new
                {
                    Message = "User registered successfully",
                    Username = user.Username,
                    Role = user.Role
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during user registration for username: {Username}", request.Username);
                return StatusCode(500, new ErrorResponse
                {
                    Message = "An error occurred during registration",
                    CorrelationId = HttpContext.TraceIdentifier
                });
            }
        }

        // LOGIN USER
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var user = _users.FirstOrDefault(u => u.Username.ToLower() == request.UserName.ToLower());

                if (user == null)
                {
                    _logger.LogWarning("Login attempt with non-existent username: {Username}", request.UserName);
                    return Unauthorized(new ErrorResponse
                    {
                        Message = "Invalid credentials",
                        CorrelationId = HttpContext.TraceIdentifier
                    });
                }

                var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);
                if (result != PasswordVerificationResult.Success)
                {
                    _logger.LogWarning("Failed login attempt for username: {Username}", request.UserName);
                    return Unauthorized(new ErrorResponse
                    {
                        Message = "Invalid credentials",
                        CorrelationId = HttpContext.TraceIdentifier
                    });
                }

                var jwtConfig = _configuration.GetSection("JWT");
                var key = jwtConfig["Key"];
                var issuer = jwtConfig["Issuer"];
                var audience = jwtConfig["Audience"];

                if (string.IsNullOrWhiteSpace(key))
                {
                    _logger.LogError("JWT Key is missing from configuration");
                    throw new InvalidOperationException("JWT Key is missing from configuration");
                }

                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var claims = new[]
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, user.Role),
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
                _logger.LogInformation("User logged in successfully: {Username}", user.Username);

                return Ok(new
                {
                    Token = tokenString,
                    Expiration = expiration,
                    Username = user.Username,
                    Role = user.Role
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during login for username: {Username}", request.UserName);
                return StatusCode(500, new ErrorResponse
                {
                    Message = "An error occurred during login",
                    CorrelationId = HttpContext.TraceIdentifier
                });
            }
        }

        // GET ALL USERS (for debugging - remove in production)
        [HttpGet("users")]
        public IActionResult GetUsers()
        {
            return Ok(_users.Select(u => new { u.Username, u.Role }));
        }
    }
}