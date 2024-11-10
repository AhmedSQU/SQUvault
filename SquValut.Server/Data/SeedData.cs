using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using squvalut.server.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace squvalut.server.Data
{
    public static class SeedData
    {
        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            try
            {
                using var context = serviceProvider.GetRequiredService<SquVaultDbContext>();

                // Ensure database is created
                context.Database.EnsureCreated();

                // Check if challenges already exist
                if (!context.Challenges.Any())
                {
                    context.Challenges.AddRange(
                        new Challenge
                        {
                            Title = "Julius ??????",
                            Description = "I really wanted to give you a hint on this one but am glitched i cant say the word ?????? see,please look at the file :",
                            ans = "SQU{Sorry_I_lieD_CaeSar}",
                            Points = 10,
                            Difficulty = ChallengeDifficulty.Easy,
                            FilePath = "/ch1.txt"
                        },
                        new Challenge
                        {
                            Title = "whaTs sO Sp3cial ?",
                            Description = "My friend likes to play games I told him to send me a flag for a chellenge we already solved but of course nothing is free,please look at the file :",
                            ans = "SQU{TH4T_W4S_EZ_4_U}",
                            Points = 20,
                            Difficulty = ChallengeDifficulty.Medium,
                            FilePath = "/ch2.txt"
                        },
                        new Challenge
                        {
                            Title = "binary OR Caeser ?",
                            Description = "Look at this file i know its a binary or caeser dycription but not sure please find the true flag for me : ",
                            ans = "SQU{BInaRy_AnD_Caeser}",
                            Points = 20,
                            Difficulty = ChallengeDifficulty.Medium,
                            FilePath = "/ch3.txt"
                        },
                        new Challenge
                        {
                            Title = "!WUSIWUG",
                            Description = "I dont know about you but (SQU_2020)!!!! is the best year students.",
                            ans = "SQU{StegH1de_4_the_w1n}",
                            Points = 20,
                            Difficulty = ChallengeDifficulty.Medium,
                            FilePath = "/ch4.jpg"
                        },
                        new Challenge
                        {
                            Title = " Meme ",
                            Description = "Dude I was scrolling on my old memes and this one wont open please help:",
                            ans = "SQU{You_Ar3_A_Tru3_H3R0}",
                            Points = 30,
                            Difficulty = ChallengeDifficulty.Hard,
                            FilePath = "/ch5.png"
                        }
                    
                    );

                    await context.SaveChangesAsync();
                    Console.WriteLine("Database seeded with initial challenges.");
                }
                else
                {
                    Console.WriteLine("Challenges already exist in the database.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while seeding the database: {ex.Message}");
            }
        }
    }
}
