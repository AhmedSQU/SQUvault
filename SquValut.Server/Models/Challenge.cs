using System.ComponentModel.DataAnnotations;
namespace squvalut.server.Models
{
    public class Challenge
    {
        [Key]
        public int ChallengeId { get; set; }

        // Initialized to empty strings
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public string ans { get; set; } = string.Empty;
        public int Points { get; set; }
        public ChallengeDifficulty Difficulty { get; set; }
        public string? FilePath { get; set; } 

    }




    public enum ChallengeDifficulty
    {
        Easy,
        Medium,
        Hard
    }
}
