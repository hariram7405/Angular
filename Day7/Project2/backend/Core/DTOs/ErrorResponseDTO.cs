namespace BugTracker.Core.DTOs
{
    public class ErrorResponse
    {
        public required string Message { get; set; }
        public required string CorrelationId { get; set; }
        public string? Detail { get; set; }
    }
}
