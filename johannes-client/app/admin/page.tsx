'use client'
import { useEffect, useState } from 'react';
import {useRouter} from 'next/navigation';
import {Section, SiteSettings} from '@/types'; 
export default function AdminPage(){
    const router = useRouter();
    const [sections, setSections] = useState<Section[]>([]);
    const [newName, setNewName] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [quote, setQuote] = useState('');
    const [quoteAuthor, setQuoteAuthor] = useState('');
   
    
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
    
      
    </main>
    );
}