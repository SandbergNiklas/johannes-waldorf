namespace Johannes.Api.Models
{
    public class CreateSectionRequest
    {
        public required string Name { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
        public string? ImageUrl { get; set; }
        public DateTime UpdatedAt = DateTime.UtcNow;
    }
}
