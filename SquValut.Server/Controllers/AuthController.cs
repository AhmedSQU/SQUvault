using Microsoft.AspNetCore.Mvc;
using squvalut.server.Data;
using squvalut.server.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace squvalut.server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly SquVaultDbContext _context;

        public AuthController(SquVaultDbContext context)
        {
            _context = context;
        }

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User model)
        {
            try
            {
                if (await _context.Users.AnyAsync(u => u.Username == model.Username))
                {
                    return BadRequest(new { message = "Username is already taken." });
                }

                _context.Users.Add(model);
                await _context.SaveChangesAsync();

                return Ok(new { id = model.Id, username = model.Username, message = "Registration successful" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during registration: {ex.Message}");
                return StatusCode(500, new { message = "An error occurred." });
            }
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User model)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == model.Username && u.Password == model.Password);

            if (user == null)
            {
                return Unauthorized(new { message = "Invalid username or password." });
            }

            // Set cookie on successful login
            Response.Cookies.Append("username", user.Username, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddHours(1)
            });

            return Ok(new { id = user.Id, username = user.Username });
        }

        // POST: api/auth/logout
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("username");
            return Ok(new { message = "Logged out successfully" });
        }
    }
}
