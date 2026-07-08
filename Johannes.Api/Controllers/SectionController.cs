using Johannes.Api.Data;
using Johannes.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System.Reflection;

namespace Johannes.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SectionController : ControllerBase
    {
        private readonly AppDbContext _context;
        public SectionController(AppDbContext context) 
        { 
            _context = context;
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<Section>>> GetAll()
        {
            var sections = await _context.Sections.ToListAsync();
            return Ok(sections);
        }
        [HttpGet("{name}")]
        public async Task<ActionResult<Section>> GetSectionByName(string name)
        {
            var section = await _context.Sections.FirstOrDefaultAsync(s => s.Name == name );
            if (section == null) 
            {
                return NotFound();
            }
            return Ok(section);
        }
        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<Section>> UpdateSection(int id, [FromBody] UpdateSectionRequest request)
        {
            var section = await _context.Sections.FindAsync(id);
            if (section == null)
            {
                return NotFound();
            }
            section.Title = request.Title;
            section.Content = request.Content;
            section.UpdatedAt = DateTime.UtcNow;
            if (request.ImageUrl != null)
            {
                section.ImageUrl = request.ImageUrl;
            }
            await _context.SaveChangesAsync();
            return Ok(section);
        }
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Section>> CreateSection(CreateSectionRequest request)
        {
            var createSection = new Section()
            {
                Name = request.Name,
                Title = request.Title,
                Content = request.Content,
                ImageUrl = request.ImageUrl,
                UpdatedAt = DateTime.UtcNow
            };
                       
            _context.Add(createSection);
            await _context.SaveChangesAsync();
            return Ok(createSection);

        }
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Section>> DeleteSection(int id)
        {
            var section = await _context.Sections.FindAsync(id);
            if (section == null)
            {
                return NotFound();
            }
            _context.Remove(section);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
