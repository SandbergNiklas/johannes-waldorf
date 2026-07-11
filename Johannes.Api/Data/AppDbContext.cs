
using Johannes.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;


namespace Johannes.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){ }
        public DbSet<Section> Sections { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<SiteSettings> SiteSettings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Section>().HasData(
                new Section { Id = 1, Name = "om-johannes", Title = "Om Johannes", Content = "Välkommen till Johannes Waldorfförskolor.", UpdatedAt = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
                new Section { Id = 2, Name = "infomoten", Title = "Infomöten", Content = "Här hittar du information om kommande infomöten.", UpdatedAt = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
                new Section { Id = 3, Name = "anmalan", Title = "Anmälan & kö", Content = "Information om anmälan och kö.", UpdatedAt = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
                new Section { Id = 4, Name = "kontakt", Title = "Kontakt", Content = "Kontakta oss på info@johanneswaldorf.se.", UpdatedAt = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc) }
                );
            modelBuilder.Entity<SiteSettings>().HasData(
            new SiteSettings
            {   Id = 1,
                Quote = "Tag emot barnet i vördnad, uppfostra det i kärlek, lämna det i frihet.",
                QuoteAuthor = "Rudolf Steiner"
            }
            );
        }

        
    }
}
