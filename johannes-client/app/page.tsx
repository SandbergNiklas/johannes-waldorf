import Hero from "@/components/Hero";
interface Section {
    id: number;
    name: string;
    title: string;
    content: string;
    updatedAt: string;
}
export default async function Home() {
  const response = await fetch('http://localhost:5058/api/section');
  const sections: Section[] = await response.json();
  return (
    <>
    <Hero/>
    <main className="max-w-4xl mx-auto p-8">
      {sections.map((section) => (
        <div key={section.id} className="mb-8">
          <h2 className="text-2xl font-bold text-green-900">{section.title}</h2>
          <p className="mt-2 text-gray-700">{section.content}</p>
        </div>
      ))}
    </main>
    </>
  );
  
}
  
