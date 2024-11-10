using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using squvalut.server.Data;
using squvalut.server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace squvalut.server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChallengesController : ControllerBase
    {
        private readonly SquVaultDbContext _context;

        public ChallengesController(SquVaultDbContext context)
        {
            _context = context;
        }

        // GET: api/challenges
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Challenge>>> GetChallenges()
        {
            var challenges = await _context.Challenges.ToListAsync();

            if (challenges == null || challenges.Count == 0)
            {
                Console.WriteLine("No challenges found in the database.");
            }
            else
            {
                Console.WriteLine($"Fetched {challenges.Count} challenges from the database.");
            }

            return challenges;
        }

        // GET: api/challenges/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Challenge>> GetChallenge(int id)
        {
            var challenge = await _context.Challenges.AsNoTracking().FirstOrDefaultAsync(c => c.ChallengeId == id);

            if (challenge == null)
            {
                Console.WriteLine($"Challenge with ID {id} not found.");
                return NotFound();
            }

            Console.WriteLine($"Fetched challenge with ID {id}.");
            return Ok(challenge); // Ensure `FilePath` is part of the response
        }


        // POST: api/challenges
        [HttpPost]
        public async Task<ActionResult<Challenge>> PostChallenge(Challenge challenge)
        {
            if (challenge == null || string.IsNullOrWhiteSpace(challenge.Title) || string.IsNullOrWhiteSpace(challenge.Description) || string.IsNullOrWhiteSpace(challenge.ans))
            {
                return BadRequest("Invalid challenge data.");
            }

            _context.Challenges.Add(challenge);
            await _context.SaveChangesAsync();

            Console.WriteLine($"Added new challenge with ID {challenge.ChallengeId}.");

            return CreatedAtAction(nameof(GetChallenge), new { id = challenge.ChallengeId }, challenge);
        }
        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var filePath = Path.Combine("wwwroot/files", file.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Ok(new { filePath });
        }
        [HttpGet("download/{fileName}")]
        public IActionResult DownloadFile(string fileName)
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/files", fileName);
            if (!System.IO.File.Exists(path))
            {
                return NotFound("File not found");
            }

            var fileBytes = System.IO.File.ReadAllBytes(path);
            return File(fileBytes, "application/octet-stream", fileName); // Forces download
        }
        [HttpGet("writeups")]
        public IActionResult GetWriteups()
        {
            // Here, return the write-ups data as JSON or HTML content.
            return Redirect("/ChallengeWriteups"); // Alternatively, return data directly
        }
        // POST: api/challenges/{id}/submit
        [HttpPost("{id}/submit")]
        public async Task<IActionResult> SubmitChallenge(int id, [FromBody] FlagSubmissionDto submission)
        {
            if (submission == null || string.IsNullOrWhiteSpace(submission.Flag))
            {
                return BadRequest("Invalid submission data.");
            }

            var challenge = await _context.Challenges.AsNoTracking().FirstOrDefaultAsync(c => c.ChallengeId == id);
            if (challenge == null)
            {
                Console.WriteLine($"Challenge with ID {id} not found.");
                return NotFound("Challenge not found");
            }

            // Temporarily bypass authentication by selecting the first user in the database
            var user = await _context.Users.FirstOrDefaultAsync();
            if (user == null)
            {
                Console.WriteLine("No users found in the database.");
                return Unauthorized("User not found");
            }

            // Check if the user has already completed this challenge
            var existingAttempt = await _context.ChallengeAttempts
                .FirstOrDefaultAsync(a => a.UserId == user.Id && a.ChallengeId == id && a.IsSuccessful);

            if (existingAttempt != null)
            {
                Console.WriteLine($"User {user.Username} has already completed challenge {id}.");
                return Ok(new { success = true, message = "Challenge already completed." });
            }

            // Validate the flag
            bool isCorrect = submission.Flag == challenge.ans;
            if (isCorrect)
            {
                // Record the successful attempt without modifying the `Challenges` table
                var attempt = new ChallengeAttempt
                {
                    UserId = user.Id,
                    ChallengeId = id,
                    AttemptDate = DateTime.Now,
                    IsSuccessful = true
                };
                _context.ChallengeAttempts.Add(attempt);
                await _context.SaveChangesAsync();

                Console.WriteLine($"User {user.Username} successfully completed challenge {id}.");
                return Ok(new { success = true, message = "Correct flag!", solved = true });
            }
            else
            {
                Console.WriteLine($"Incorrect flag submitted for Challenge ID {id}.");
                return Ok(new { success = false, message = "Wrong flag" });
            }
        }
    }
}
