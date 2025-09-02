using BugTracker.Core.DTOs;
using BugTracker.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BugTracker.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BugController : ControllerBase
    {
        private readonly IBugService _service;

        public BugController(IBugService service)
        {
            _service = service;
        }

        // GET /api/bug - All roles can access
        [HttpGet]
        [Authorize(Roles = "Admin,Developer,Tester")]
        public async Task<ActionResult<IEnumerable<BugResponseDTO>>> GetAllAsync()
        {
            var bugs = await _service.GetAllBugsAsync();
            return Ok(bugs);
        }

        // GET /api/bug/{id} - All roles can access
        [HttpGet("{id}", Name = "GetBugById")]
        [Authorize(Roles = "Admin,Developer,Tester")]
        public async Task<ActionResult<BugResponseDTO>> GetByIdAsync(int id)
        {
            var bug = await _service.GetBugByIdAsync(id);
            if (bug == null)
                return NotFound();

            return Ok(bug);
        }

        // POST /api/bug - Only Admin and Developer can create bugs
        [HttpPost]
        [Authorize(Roles = "Admin,Developer")]
        public async Task<ActionResult> CreateAsync([FromBody] BugRequestDTO dto)
        {
            var id = await _service.CreateBugAsync(dto);
            var createdBug = await _service.GetBugByIdAsync(id);
            return CreatedAtRoute("GetBugById", new { id }, createdBug);
        }

        // PUT /api/bug/{id} - Only Admin and Developer can update bugs
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Developer")]
        public async Task<ActionResult> UpdateAsync(int id, [FromBody] BugRequestDTO dto)
        {
            var existing = await _service.GetBugByIdAsync(id);
            if (existing == null)
                return NotFound();

            await _service.UpdateBugAsync(id, dto);
            return Ok(new { Message = "Bug updated successfully." });
        }

        // DELETE /api/bug/{id} - Only Admin can delete bugs
        [HttpDelete("{id}")]
        [Authorize(Policy = "RequireAdmin")]
        public async Task<ActionResult> DeleteAsync(int id)
        {
            var existing = await _service.GetBugByIdAsync(id);
            if (existing == null)
                return NotFound();

            await _service.DeleteBugAsync(id);
            return Ok(new { Message = "Bug deleted successfully." });
        }
        [HttpGet("me")]
        [Authorize]
        public ActionResult GetMyClaims()
        {
            var username = User.Identity?.Name;
            var role = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
            return Ok(new { Username = username, Role = role });
        }
    }
}
