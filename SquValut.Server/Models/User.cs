using System.ComponentModel.DataAnnotations;

public class User
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)] 
    public string Username { get; set; }

    [Required]
    [MinLength(8)] 
    public string Password { get; set; }

    public int Score { get; set; } = 0;  
}
