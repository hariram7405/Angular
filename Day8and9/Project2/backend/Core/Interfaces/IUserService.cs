using BugTracker.Core.DTOs;

namespace BugTracker.Core.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserResponseDTO>> GetAllUsersAsync();
    }
}