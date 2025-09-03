namespace BugTracker.Core.DTOs
{
    public class RegistrationRequest
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
        public required string Role { get; set; }
    }
}