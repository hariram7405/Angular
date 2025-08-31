using System.Text.Json.Serialization;

namespace BugTracker.Core.DTOs
{
    public class LoginRequest
    {
        [JsonPropertyName("username")]
        public required string UserName { get; set; }

        [JsonPropertyName("password")]
        public required string Password { get; set; }
    }
}
