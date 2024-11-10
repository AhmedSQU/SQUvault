using Microsoft.EntityFrameworkCore;
using squvalut.server.Data;
using Microsoft.AspNetCore.Identity;
using System;

var builder = WebApplication.CreateBuilder(args);

// Configure Entity Framework with the connection string from appsettings.json
builder.Services.AddDbContext<SquVaultDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policyBuilder =>
        policyBuilder.AllowAnyOrigin()
                     .AllowAnyMethod()
                     .AllowAnyHeader());
});

// Add services for controllers, Razor Pages, and Swagger
builder.Services.AddControllers();
builder.Services.AddRazorPages();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure middleware

// Serve default files and static files
app.UseDefaultFiles();
app.UseStaticFiles();

// Error handling middleware for production
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/error");
    app.UseHsts();
}

// Enable CORS
app.UseCors("AllowAll");

// Enable HTTPS redirection
app.UseHttpsRedirection();

// Configure routing
app.UseRouting();

// Authentication and Authorization (if applicable)
app.UseAuthentication(); // Only if you're using custom auth middleware
app.UseAuthorization();

// Configure Swagger (only in development)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
        c.RoutePrefix = "swagger";
    });
}

// Configure endpoints for Razor Pages and API Controllers
app.MapRazorPages();
app.MapControllers();

// Fallback route for Single Page Application (SPA)
app.MapFallbackToFile("/index.html");

// Seed the database with initial data if necessary
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        // Run the seed data method to populate the database
        await SeedData.Initialize(services);
        Console.WriteLine("Database seeding completed successfully.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"An error occurred while seeding the database: {ex.Message}");
    }
}

// Run the application
app.Run();
