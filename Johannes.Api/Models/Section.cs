using Microsoft.Identity.Client;

namespace Johannes.Api.Models
{
    public class Section
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
        public DateTime UpdatedAt   { get; set; }
    }
}
