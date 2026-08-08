'use client'
import { useEffect, useState } from 'react';
import {useRouter} from 'next/navigation';
import {Section, SiteSettings} from '@/types';
import { Image } from '@/types'; 
export default function AdminPage(){
    const router = useRouter();
    const [sections, setSections] = useState<Section[]>([]);
    const [newName, setNewName] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [quote, setQuote] = useState('');
    const [quoteAuthor, setQuoteAuthor] = useState('');
    const [galleryFile, setGalleryFile] = useState<File | null>(null);
    const [galleryAltText, setGalleryAltText] = useState('');
    const [galleryImages, setGalleryImages] = useState<Image[]>([]);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if(!token){
            router.push('/admin/login');
            return;
        }
        fetch('http://localhost:5058/api/section', {
            headers: { Authorization: `Bearer ${token}`}
            })
            .then(res => res.json())
            .then(data => setSections(data));

        fetch('http://localhost:5058/api/sitesettings')   
        .then(res => res.json())
        .then((data: SiteSettings)=> {
          setQuote(data.quote)
          setQuoteAuthor(data.quoteAuthor)
        });
        fetch('http://localhost:5058/api/images/gallery')
        .then(res => res.json())
        .then((data: Image[]) => setGalleryImages(data)); 
    }, []);

    async function handleCreate(){
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5058/api/section', {
            method: 'POST',
            headers: {'Content-Type':'application/json',
                    Authorization: `Bearer ${token}`    
            }, 
            body: JSON.stringify({Name: newName, Title: newTitle, Content: newContent})
        });
        if(!response.ok){
            alert('Något gick fel vid skapandet');
            return;
        }
        const newSection: Section = await response.json();
        setSections([...sections, newSection]);        
                
        console.log(`Ny section {newSection}`);

        setNewName('');
        setNewTitle('');
        setNewContent('');
    }
    async function handleUpdateQuote(){
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5058/api/siteSettings', {
            method: 'PUT',
            headers: {'Content-Type':'application/json',
                    Authorization: `Bearer ${token}`    
            }, 
            body: JSON.stringify({quote: quote, quoteAuthor: quoteAuthor})
        });
        if(!response.ok){
            alert('Något gick fel vid updatering av Citat');
            return;
        }
        
        console.log(`Nytt citat {siteSetting.Qoute}`);
    }
    async function handleGalleryUpload() {
    if (!galleryFile) return;
    
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', galleryFile);
    formData.append('altText', galleryAltText);
    formData.append('isGallery', 'true'); // alltid true här
    
    const response = await fetch('http://localhost:5058/api/images/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
    
    if (!response.ok) {
      alert('Något gick fel vid bilduppladdning');
      return;
    }
    
    alert('Bild tillagd i galleriet!');
    setGalleryFile(null);
    setGalleryAltText('');
  }
  async function handleDeleteGalleryImage(id: number) {
  const confirmed = window.confirm('Ta bort bilden från galleriet?');
  if (!confirmed) return;
  
  const token = localStorage.getItem('token');
  
  await fetch(`http://localhost:5058/api/images/gallery/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  
  setGalleryImages(galleryImages.filter(img => img.id !== id));
}
    
    return (<main className='max-w-4xl mx-auto p-8'>
        <h1 className="font-waldorf text-3xl text-green-900 mb-8">
            Admin
            </h1>
        {sections.map((section) => (
        <div key={section.id} id={section.name} className="font-waldorf flex justify-between items-center border-b py-4 gap-4">
          <span>{section.title}</span>
          <button type="button" onClick={() => router.push(`/admin/edit/${section.name}`)}>
            Redigera</button>
        </div>
        ))}
        <h1 className=" font-waldorf text-3xl text-green-900 mb-8">
      Skapa ny sektion
    </h1>
    <div className="mb-4">
      <label className=" font-waldorf block text-green-900 mb-2">Namn</label>
      <input 
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        className="w-full border rounded p-2"
      />
    </div>
    <div className="mb-4">
      <label className="font-waldorf block text-green-900 mb-2">Titel</label>
      <input 
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className="w-full border rounded p-2"
      />
    </div>
    <div className="mb-4">
      <label className="font-waldorf block text-green-900 mb-2">Innehåll</label>
      <input 
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        className="w-full border rounded p-2"
      />
    </div>
    <button 
      type="button" 
      onClick={handleCreate}
      className="font-waldorf bg-green-900 text-white px-6 py-2 rounded w-full"
    >
      Skapa
    </button>
    <div className="mb-4">
      <label className="font-waldorf block text-green-900 mb-2">Citat</label>
      <input 
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
        className="w-full border rounded p-2"
      />
    </div>
    <div className="mb-4">
      <label className="font-waldorf block text-green-900 mb-2">Författare</label>
      <input 
        value={quoteAuthor}
        onChange={(e) => setQuoteAuthor(e.target.value)}
        className="w-full border rounded p-2"
      />
    </div>
    <button 
      type="button" 
      onClick={handleUpdateQuote}
      className="font-waldorf bg-green-900 text-white px-6 py-2 rounded w-full"
    >
      Spara nytt citat
    </button>
    <h2 className="font-waldorf text-2xl text-green-900 mt-8 mb-4">Bildgalleri</h2>
<div className="mb-4">
  <label className="font-waldorf block text-green-900 mb-2">Alt-text</label>
  <input
    value={galleryAltText}
    onChange={(e) => setGalleryAltText(e.target.value)}
    className="w-full border rounded p-2"
  />
</div>
<div className="mb-4">
  <label className="font-waldorf block text-green-900 mb-2">Välj bild</label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => setGalleryFile(e.target.files?.[0] || null)}
    className="w-full border rounded p-2"
  />
</div>
<button
  type="button"
  onClick={handleGalleryUpload}
  className="font-waldorf bg-green-900 text-white px-6 py-2 rounded w-full"
>
  Ladda upp till galleri
</button>
<div className="grid grid-cols-3 gap-4 mt-4">
  {galleryImages.map((image) => (
    <div key={image.id} className="relative">
      <img
        src={`http://localhost:5058${image.url}`}
        alt={image.altText}
        className="w-full h-32 object-cover rounded"
      />
      <button
        type="button"
        onClick={() => handleDeleteGalleryImage(image.id)}
        className="absolute top-1 right-1 bg-red-700 text-white px-2 py-1 rounded text-xs"
      >
        Ta bort
      </button>
    </div>
  ))}
</div>
      
    </main>
    );
}