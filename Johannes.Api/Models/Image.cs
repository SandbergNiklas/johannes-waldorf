namespace Johannes.Api.Models
{
    public class Image
    {
        public int Id { get; set; }
        public required string FileName { get; set; }
        public required string Url { get; set; }
        public required string AltText { get; set; }
        public string? Caption { get; set; }
        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
    }
}
