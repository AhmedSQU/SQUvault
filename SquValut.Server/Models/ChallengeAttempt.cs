using System;

namespace squvalut.server.Models
{
    public class ChallengeAttempt
    {
        public int ChallengeAttemptId { get; set; }
        public int UserId { get; set; }
        public int ChallengeId { get; set; }
        public DateTime AttemptDate { get; set; }
        public bool IsSuccessful { get; set; }
        public Challenge Challenge { get; set; } = new Challenge();
    }
}
