using Xunit;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BugTracker.Core.Entities;
using BugTracker.Core.Interfaces;
using BugTracker.Core.Services;
using BugTracker.Core.DTOs;
using BugTracker.Core.Exceptions;

namespace BugTrackerTest.Services
{
    public class BugServiceTests
    {
        [Fact]
        public async Task CreateBugAsync_WithValidDTO_CreatesSuccessfully()
        {
            // Arrange
            var request = new BugRequestDTO
            {
                Title = "New Bug",
                Description = "New bug description",
                Status = "open",
                ProjectId = 201
            };

            var mockRepo = new Mock<IBugRepository>();
            mockRepo.Setup(repo => repo.AddAsync(It.IsAny<Bug>())).Returns(Task.CompletedTask);

            var service = new BugService(mockRepo.Object);

            // Act
            await service.CreateBugAsync(request);

            // Assert
            mockRepo.Verify(repo => repo.AddAsync(It.Is<Bug>(b =>
                b.Title == request.Title &&
                b.Description == request.Description &&
                b.Status == request.Status &&
                b.ProjectId == request.ProjectId
            )), Times.Once);
        }

        [Fact]
        public async Task GetBugByIdAsync_WithInvalidId_ThrowsNotFoundException()
        {
            // Arrange
            int invalidId = 999;
            var mockRepo = new Mock<IBugRepository>();
            mockRepo.Setup(repo => repo.GetByIdAsync(invalidId)).ReturnsAsync((Bug?)null);

            var service = new BugService(mockRepo.Object);

            // Act & Assert
            await Assert.ThrowsAsync<NotFoundException>(() => service.GetBugByIdAsync(invalidId));
        }

        [Fact]
        public async Task GetBugByIdAsync_WithValidId_ReturnsBug()
        {
            // Arrange
            int existingId = 1;

            var existingBug = new Bug
            {
                Id = existingId,
                Title = "UI Bug",
                Description = "App is not responsive",
                Status = "open",
                CreatedOn = DateTime.UtcNow,
                ProjectId = 101
            };

            var mockRepo = new Mock<IBugRepository>();
            mockRepo.Setup(repo => repo.GetByIdAsync(existingId)).ReturnsAsync(existingBug);

            var service = new BugService(mockRepo.Object);

            // Act
            var result = await service.GetBugByIdAsync(existingId);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("UI Bug", result.Title);
            Assert.Equal("App is not responsive", result.Description);
            Assert.Equal("open", result.Status);
        }

        [Fact]
        public async Task UpdateBugAsync_WithExistingBug_UpdatesSuccessfully()
        {
            // Arrange
            int existingId = 1;

            var existingBug = new Bug
            {
                Id = existingId,
                Title = "Old Title",
                Description = "Old Description",
                Status = "open",
                CreatedOn = DateTime.UtcNow,
                ProjectId = 301
            };

            var updateDto = new BugRequestDTO
            {
                Title = "Updated Title",
                Description = "Updated Description",
                Status = "closed",
                ProjectId = 301
            };

            var mockRepo = new Mock<IBugRepository>();
            mockRepo.Setup(repo => repo.GetByIdAsync(existingId)).ReturnsAsync(existingBug);
            mockRepo.Setup(repo => repo.UpdateAsync(It.IsAny<Bug>())).Returns(Task.CompletedTask);

            var service = new BugService(mockRepo.Object);

            // Act
            await service.UpdateBugAsync(existingId, updateDto);

            // Assert
            mockRepo.Verify(repo => repo.UpdateAsync(It.Is<Bug>(b =>
                b.Id == existingId &&
                b.Title == updateDto.Title &&
                b.Description == updateDto.Description &&
                b.Status == updateDto.Status
            )), Times.Once);
        }

        [Fact]
        public async Task GetAllBugsAsync_ReturnsCorrectData()
        {
            // Arrange
            var fakeBugs = new List<Bug>
            {
                new Bug { Id = 1, Title = "UI Bug", Description = "App is not responsive", Status = "open", CreatedOn = DateTime.UtcNow, ProjectId = 101 },
                new Bug { Id = 2, Title = "VPN Bug", Description = "VPN disconnects often", Status = "closed", CreatedOn = DateTime.UtcNow, ProjectId = 102 }
            };

            var mockRepo = new Mock<IBugRepository>();
            mockRepo.Setup(repo => repo.GetAllAsync()).ReturnsAsync(fakeBugs);

            var bugService = new BugService(mockRepo.Object);

            // Act
            var result = (await bugService.GetAllBugsAsync()).ToList();

            // Assert
            Assert.Equal(2, result.Count);
            Assert.Equal("UI Bug", result[0].Title);
            Assert.Equal("VPN Bug", result[1].Title);
        }
    }
}
