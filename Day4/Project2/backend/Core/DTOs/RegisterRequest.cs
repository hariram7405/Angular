using System.ComponentModel.DataAnnotations;

namespace BugTracker.Core.DTOs
{
    public class RegisterRequest
    {
        [Required(ErrorMessage = "Username is required")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Username must be between 3 and 50 characters")]
        public required string Username { get; set; }
        
        [Required(ErrorMessage = "Password is required")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters long")]
        public required string Password { get; set; }
        
        [Required(ErrorMessage = "Role is required")]
        public required string Role { get; set; } = "Developer";
    }
}
