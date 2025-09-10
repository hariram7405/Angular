namespace BugTracker.Core.DTOs
{
    public class UserResponseDTO
    {
        public int Id { get; set; }
        public required string Username { get; set; }
        public required string Role { get; set; }
    }
}