namespace Johannes.Api.Models
{
    public class UpdateSectionRequest
    {
        public required string Title { get; set; }
        public required string Content { get; set; }
        public string? ImageUrl { get; set; }
            
    }
}
