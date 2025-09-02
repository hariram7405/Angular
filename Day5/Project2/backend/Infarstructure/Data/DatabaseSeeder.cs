using BugTracker.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace BugTracker.Infrastructure.Data
{
    public static class DatabaseSeeder
    {
        public static async Task SeedAsync(BugTrackerContext context)
        {
            if (await context.Projects.AnyAsync())
                return;

            var projects = new List<Project>
            {
                new Project
                {
                    Name = "E-Commerce Platform",
                    Description = "Online shopping platform development"
                },
                new Project
                {
                    Name = "Mobile Banking App",
                    Description = "Secure mobile banking application"
                },
                new Project
                {
                    Name = "CRM System",
                    Description = "Customer relationship management system"
                }
            };

            await context.Projects.AddRangeAsync(projects);
            await context.SaveChangesAsync();

            var bugs = new List<Bug>
            {
                new Bug
                {
                    Title = "Login page not responsive",
                    Description = "Login page doesn't work properly on mobile devices",
                    Status = "Open",
                    CreatedOn = DateTime.Now.AddDays(-5),
                    ProjectId = projects[0].Id
                },
                new Bug
                {
                    Title = "Payment gateway timeout",
                    Description = "Payment processing times out after 30 seconds",
                    Status = "In Progress",
                    CreatedOn = DateTime.Now.AddDays(-3),
                    ProjectId = projects[0].Id
                },
                new Bug
                {
                    Title = "Biometric authentication fails",
                    Description = "Fingerprint authentication not working on Android devices",
                    Status = "Open",
                    CreatedOn = DateTime.Now.AddDays(-2),
                    ProjectId = projects[1].Id
                },
                new Bug
                {
                    Title = "Contact sync issues",
                    Description = "Customer contacts not syncing properly",
                    Status = "Resolved",
                    CreatedOn = DateTime.Now.AddDays(-7),
                    ProjectId = projects[2].Id
                }
            };

            await context.Bugs.AddRangeAsync(bugs);
            await context.SaveChangesAsync();
        }
    }
}