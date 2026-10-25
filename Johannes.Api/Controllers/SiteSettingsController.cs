using Johannes.Api.Data;
using Johannes.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace Johannes.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SiteSettingsController : ControllerBase
    {   
        private readonly AppDbContext _context;
        public SiteSettingsController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<SiteSettings>> GetSiteSettingsAsync()
        {  
            var siteSettings = await _context.SiteSettings.FirstOrDefaultAsync();
            if (siteSettings == null) 
            { 
                return NotFound();
            }
            return Ok(siteSettings);
        }
        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult<SiteSettings>> UpdateSiteSettingsAsync([FromBody] UpdateSiteSettingsRequest request)
        {
            var siteSettings = await _context.SiteSettings.FirstOrDefaultAsync();
            if (siteSettings == null)
            {
                siteSettings = new SiteSettings
                {
                    Quote = request.Quote,
                    QuoteAuthor = request.QuoteAuthor,
                };
                _context.SiteSettings.Add(siteSettings);
            }
            else
            {
                siteSettings.Quote = request.Quote;
                siteSettings.QuoteAuthor = request.QuoteAuthor;
                
            }
            await _context.SaveChangesAsync();
            return Ok(siteSettings);

        }
    }
}
