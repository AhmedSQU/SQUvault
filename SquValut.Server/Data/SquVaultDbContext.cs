using Microsoft.EntityFrameworkCore;
using squvalut.server.Models;

namespace squvalut.server.Data
{
    public class SquVaultDbContext : DbContext
    {
        public SquVaultDbContext(DbContextOptions<SquVaultDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Challenge> Challenges { get; set; }
        public DbSet<ChallengeAttempt> ChallengeAttempts { get; set; }
    }
}
