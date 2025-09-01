using BugTracker.Core.DTOs;

namespace BugTracker.Core.Interfaces
{
    public interface IProjectService
    {
        Task CreateProjectAsync(ProjectRequestDTO request);
        Task<ProjectResponseDTO?> GetProjectByIdAsync(int id);
        Task<IEnumerable<ProjectResponseDTO>> GetAllProjectsAsync();
        Task UpdateProjectAsync(int id, ProjectRequestDTO request);
        Task DeleteProjectAsync(int id);
    }
}
