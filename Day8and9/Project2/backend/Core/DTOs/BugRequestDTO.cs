namespace BugTracker.Core.DTOs
{
    public class BugRequestDTO
    {
        public required string Title { get; set; }
        public required string Description { get; set; }
        public string Status { get; set; } = "open";
        public string Priority { get; set; } = "Medium";
        public int ProjectId { get; set; }
        public int? AssignedToUserId { get; set; }
    }
}
