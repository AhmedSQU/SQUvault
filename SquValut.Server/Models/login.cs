﻿// File: Models/LoginModel.cs
using System.ComponentModel.DataAnnotations;

namespace squvalut.server.Models
{
    public class LoginModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
