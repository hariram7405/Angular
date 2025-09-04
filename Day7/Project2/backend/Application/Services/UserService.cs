using BugTracker.Core.DTOs;
using BugTracker.Core.Interfaces;

namespace BugTracker.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<UserResponseDTO>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllAsync();
            return users.Select(u => new UserResponseDTO
            {
                Id = u.Id,
                Username = u.Username,
                Role = u.Role
            });
        }
    }
}