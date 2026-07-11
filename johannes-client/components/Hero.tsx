import { SiteSettings } from '@/types';
export default async function Hero() {
    const response = await fetch('http://localhost:5058/api/siteSettings');
    const siteSettings: SiteSettings = await response.json();
  
  return (
    
    <div className="relative h-[500px] w-full">
      <img
        src="http://localhost:5058/images/9e1b450f-4f74-4d85-a1f1-95894915e97e..jpg"
        alt="Johannes Waldorfförskolor"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white text-center">
        <h1 className="font-waldorf text-6xl mb-4">
          Johannes Waldorfförskolor
        </h1>
        <p className="text-xl mb-8">En plats för lek, lärande och natur</p>
        <blockquote className="font-waldorf text-2xl italic max-w-2xl">
          {siteSettings.quote}
        </blockquote>
        <p className="mt-2 text-sm">— {siteSettings.quoteAuthor}</p>
      </div>
    </div>
  );
}