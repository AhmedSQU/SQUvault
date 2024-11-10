using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

public class ChallengeWriteupDetailsModel : PageModel
{
    public ChallengeWriteup Writeup { get; set; }

    public IActionResult OnGet(int id)
    {
        // Replace with actual data fetching logic
        var writeups = new List<ChallengeWriteup>
        {
            new ChallengeWriteup { Id = 1, Title = "Basic Challenge", Summary = "An intro to the CTF.", Content = "Full write-up...", DatePublished = DateTime.Now },
            new ChallengeWriteup { Id = 2, Title = "Intermediate Challenge", Summary = "A moderate challenge.", Content = "Full write-up...", DatePublished = DateTime.Now }
        };

        Writeup = writeups.Find(w => w.Id == id);
        if (Writeup == null)
        {
            return NotFound();
        }

        return Page();
    }
}
