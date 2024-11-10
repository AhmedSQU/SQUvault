using Microsoft.AspNetCore.Mvc;
using squvalut.server.Data;
using squvalut.server.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace squvalut.server.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly SquVaultDbContext _context;

        public UsersController(SquVaultDbContext context)
        {
            _context = context;
        }

        // GET: api/users/profile?username={username}
        [HttpGet("profile")]
        public async Task<ActionResult<User>> GetProfile([FromQuery] string username)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == username);
            if (user == null)
            {
                return NotFound("User not found");
            }

            return Ok(user);
        }
    }
}
