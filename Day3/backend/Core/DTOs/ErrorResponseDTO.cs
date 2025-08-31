namespace BugTracker.Core.DTOs
{
    public class ErrorResponse
    {
        public string Message { get; set; }
        public string CorrelationId { get; set; }
        public string? Detail { get; set; }
    }
}
