using BugTracker.Core.DTOs;
using BugTracker.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BugTracker.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BugViewController : ControllerBase
    {
        private readonly IBugService _bugService;

        public BugViewController(IBugService bugService)
        {
            _bugService = bugService;
        }

        [HttpGet("Bugs")]
        public async Task<ActionResult<IEnumerable<BugResponseDTO>>> GetBugs()
        {
            var bugs = await _bugService.GetAllBugsAsync();
            return Ok(bugs);
        }

        [HttpGet("BugDetails/{id}")]
        public async Task<ActionResult<BugResponseDTO>> GetBugDetails(int id)
        {
            var bug = await _bugService.GetBugByIdAsync(id);
            if (bug == null)
                return NotFound();

            return Ok(bug);
        }
    }
}