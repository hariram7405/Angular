using BugTracker.Core.Entities;
using BugTracker.Core.Interfaces;
using BugTracker.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BugTracker.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly BugTrackerContext _context;

        public UserRepository(BugTrackerContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }
    }
}