import Hero from "@/components/Hero";
import ImageCarousel from "@/components/ImageCarousel";
import {Image, SiteSettings} from "@/types/index";

// I page.tsx och admin/page.tsx
import { Section } from '@/types';


export default async function Home() {
  const response = await fetch('http://localhost:5058/api/section', {cache: 'no-store'});
  const imagesResponse = await fetch('http://localhost:5058/api/images/gallery', { cache: 'no-store' });
  const images: Image[] = await imagesResponse.json();  
  const settingsResponse = await fetch('http://localhost:5058/api/sitesettings', { cache: 'no-store' });
  const siteSettings : SiteSettings = await settingsResponse.json();
  console.log('Antal bilder:', images.length);

  function renderContentWithLinks(content: string) {
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
  const parts = content.split(emailRegex);
  const emails = content.match(emailRegex) || [];
  
  return parts.map((part, index) => (
    <span key={index}>
      {part}
      {emails[index] && (
        <a 
          href={`mailto:${emails[index]}`}
          className="underline hover:text-green-200"
        >
          {emails[index]}
        </a>
      )}
    </span>
  ));
  }
  const sections: Section[] = await response.json();
  return (
    <>
    
    <div className="relative w-full h-screen" id="top">
      <ImageCarousel images={images} />
      <div className="absolute inset-0 flex flex-col justify-start items-center text-center pointer-events-none pt-16">
        <h1 className="font-waldorf text-6xl text-white drop-shadow-lg">
          Johannes Waldorfförskolor
        </h1>
        <p className="text-white text-xl mt-4 drop-shadow-lg">
          En plats för lek, lärande och natur
        </p>
        <blockquote className="font-waldorf text-xl italic text-white max-w-2xl mt-6 drop-shadow-lg">
        &ldquo;{siteSettings.quote}&rdquo;
        </blockquote>
        <p className="text-white mt-2 drop-shadow-lg">— {siteSettings.quoteAuthor}</p>
      </div>
    </div>
    <main className="font-waldorf w-full mx-auto">
      {sections.map((section) => (
        <div 
        key={section.id} 
        id={section.name} 
        className="mb-8 min-h-[300px] p-12 w-full flex flex-col justify-center items-center text-center"
        style={section.imageUrl ? {
        backgroundImage: `url(http://localhost:5058${section.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }: {}}>
          <div className="bg-black/40 p-6 rounded w-full max-w-3xl mx-auto text-left">
            <h2 className="font-waldorf text-2xl text-white mb-2">{section.title}</h2>
                <p className="text-white text-base leading-relaxed" 
                style={{fontFamily: 'var(--font-lora)'}}>
                {renderContentWithLinks(section.content)}
                </p>
          </div>            
        </div>
      ))}
    </main>
    </>
  );
  
}
  
