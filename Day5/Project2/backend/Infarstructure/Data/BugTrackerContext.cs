using BugTracker.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace BugTracker.Infrastructure.Data
{
    public class BugTrackerContext : DbContext
    {
        public BugTrackerContext(DbContextOptions<BugTrackerContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .Property(u => u.Id)
                .ValueGeneratedOnAdd();
        }

        public DbSet<Bug> Bugs => Set<Bug>();
        public DbSet<Project> Projects => Set<Project>();
        public DbSet<User> Users => Set<User>();
    }
}
