using BugTracker.Core.Entities;
using BugTracker.Core.Interfaces;

namespace BugTracker.Infrastructure.Repositories
{
    public class BugRepository : IBugRepository
    {
        private static int _nextId = 4;
        private readonly List<Bug> _bugs = new()
        {
            new Bug { Id = 1, Title = "Login Bug", Description = "Cannot login", Status = "Open", ProjectId = 1, CreatedOn = DateTime.Now.AddDays(-2) },
            new Bug { Id = 2, Title = "UI Issue", Description = "Button not working", Status = "In Progress", ProjectId = 1, CreatedOn = DateTime.Now.AddDays(-1) },
            new Bug { Id = 3, Title = "Performance", Description = "Page loads slowly", Status = "Closed", ProjectId = 2, CreatedOn = DateTime.Now }
        };


     

        public async Task<IEnumerable<Bug>> GetAllAsync()
        {
            return await Task.FromResult<IEnumerable<Bug>>(_bugs);
        }

        public async Task<Bug?> GetByIdAsync(int id)
        {
            return await Task.FromResult(_bugs.FirstOrDefault(b => b.Id == id));
        }

        public async Task AddAsync(Bug entity)
        {
            entity.Id = _nextId++;
            entity.CreatedOn = DateTime.UtcNow;
            _bugs.Add(entity);
            await Task.CompletedTask;
        }

        public async Task UpdateAsync(Bug bug)
        {
            var existing = _bugs.FirstOrDefault(b => b.Id == bug.Id);
            if (existing != null)
            {
                existing.Title = bug.Title;
                existing.Description = bug.Description;
                existing.Status = bug.Status;
                existing.ProjectId = bug.ProjectId;
            }
            await Task.CompletedTask;
        }

        public async Task DeleteAsync(int id)
        {
            var bug = _bugs.FirstOrDefault(b => b.Id == id);
            if (bug != null)
            {
                _bugs.Remove(bug);
            }
            await Task.CompletedTask;
        }
    }
}
