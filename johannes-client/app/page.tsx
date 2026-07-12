import Hero from "@/components/Hero";

// I page.tsx och admin/page.tsx
import { Section } from '@/types';

export default async function Home() {
  const response = await fetch('http://localhost:5058/api/section', {
    cache: 'no-store'
  });
  const sections: Section[] = await response.json();
  return (
    <>
    <Hero/>
    
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
          <h2 className="text-2xl font-bold text-green-900 mb-2">{section.title}</h2>
          <p className="mt-2 text-gray-700">{section.content}</p>
        </div>
      ))}
    </main>
    </>
  );
  
}
  
