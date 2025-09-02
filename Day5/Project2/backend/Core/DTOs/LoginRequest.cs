using System.ComponentModel.DataAnnotations;

namespace BugTracker.Core.DTOs
{
    public class LoginRequest
    {
        [Required(ErrorMessage = "Username is required")]
        public required string UserName { get; set; }
        
        [Required(ErrorMessage = "Password is required")]
        public required string Password { get; set; }
    }
}
