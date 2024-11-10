using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;

public class ChallengeWriteupsModel : PageModel
{
    public List<ChallengeWriteup> Writeups { get; set; }

    public void OnGet()
    {
        Writeups = new List<ChallengeWriteup>
        {
            new ChallengeWriteup { Id = 1, Title = "Basic Challenge", Summary = "An introduction to the CTF.", Content = "Full write-up here...", DatePublished = DateTime.Now },
            new ChallengeWriteup { Id = 2, Title = "Intermediate Challenge", Summary = "A moderately difficult challenge.", Content = "Full write-up here...", DatePublished = DateTime.Now }
        };
    }
}
