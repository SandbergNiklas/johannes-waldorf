using Johannes.Api.Data;
using Johannes.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Johannes.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public ImagesController(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }
        [Authorize] 
        [HttpPost("upload")]
        public async Task<ActionResult<Image>> Upload(IFormFile file, [FromForm] string altText, [FromForm] string? caption)
        {
            if (file == null || file.Length == 0) 
            {
                return BadRequest("Ingen fil vald");
            }
            var uploadsFolder = Path.Combine(_env.WebRootPath ?? "wwwroot", "images");
            Directory.CreateDirectory(uploadsFolder);

            var extension = Path.GetExtension(file.FileName).TrimStart('.');
            var uniqueFileName = $"{Guid.NewGuid()}.{extension}";
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            { 
                await file.CopyToAsync(stream);
            }

            var image = new Image
            {
                FileName = uniqueFileName,
                Url = $"/images/{uniqueFileName}",
                AltText = altText,
                Caption = caption,
                UploadedAt = DateTime.UtcNow,
            };
            _context.Images.Add(image);
            await _context.SaveChangesAsync();
            return Ok(image);

        }
        [HttpGet()]
        public async Task<ActionResult<IEnumerable<Image>>> GetAll()
        {
            var images = await _context.Images.ToListAsync();
            return Ok(images);
        }


    }
}
