'use client'
import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import { useParams } from 'next/navigation';
import {Section} from '@/types'; 
export default function EditPage() {
    const router = useRouter();
    const params = useParams();
    const name = params.name;

    const [section, setSection] = useState<Section | null>(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
     const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
            const token = localStorage.getItem('token');
            if(!token){
                router.push('/admin/login');
                return;
            }
            fetch(`http://localhost:5058/api/section/${name}`, {
                headers: { Authorization: `Bearer ${token}`}
                })
                .then(res => res.json())
                .then((data: Section) => {
                    setSection(data);
                    setTitle(data.title);
                    setContent(data.content);
                });
                
        }, []);
        async function handleSave(){
            const token = localStorage.getItem('token');

            await fetch(`http://localhost:5058/api/section/${section?.id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type':'application/json',
                    Authorization: `Bearer ${token}`
            }, 
            body: JSON.stringify({title, content})
            });

            router.push('/admin');
        }
        async function handleDelete(){

            if (!section) return;
            
            const confirmed = window.confirm('Är du säker på att du vill ta bort denna sektion');
            const token = localStorage.getItem('token');
            
            if(!confirmed) return;

            await fetch(`http://localhost:5058/api/section/${section?.id}`, {
                method: 'DELETE',
                headers: {                     
                    Authorization: `Bearer ${token}`
            }
            
            });
            router.push('/admin');
        }
        async function handleUploadImage(){
      if(!selectedFile)
        return;
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('altText', title);

      const response = await fetch('http://localhost:5058/api/images/upload', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`    
            }, 
            body: formData
        });
        if(!response.ok){
            alert('Något gick fel vid bilduppladdning');
            return;
        }
        const image = await response.json();
        await fetch(`http://localhost:5058/api/section/${section?.id}`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json',
                    Authorization: `Bearer ${token}`    
            }, 
            body: JSON.stringify({title, content, imageUrl: image.url})
        });
        alert('Bild uppladdad!');
    }
        
    
  return (
  <main className="max-w-2xl mx-auto p-8">
    <button 
      type="button"
      onClick={() => router.push('/admin')}
      className="text-green-900 mb-6 inline-block hover:underline"
    >
      ← Tillbaka
    </button>
    <h1 className="font-waldorf text-3xl text-green-900 mb-8">
      Redigera — {section?.title}
    </h1>
    <div className="mb-4">
      <label className="font-waldorf block text-green-900 mb-2">Titel</label>
      <input 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-stone-300 rounded p-2 focus:outline-none focus:border-green-900"
      />         
    </div>
    <div className="mb-6">
      <label className="font-waldorf block text-green-900 mb-2">Innehåll</label>
      <textarea 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={6}
        className="w-full border border-stone-300 rounded p-2 focus:outline-none focus:border-green-900"
      />
    </div>
    <button 
      type="button" 
      onClick={handleSave}
      className="bg-green-900 text-white px-6 py-2 rounded hover:bg-green-800"
    >
      Spara
    </button>
    <br/>
    <button 
      type="button" onClick={handleDelete}    
      className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Ta Bort
    </button>
    <div className="mb-4">
  <label className="font-waldorf block text-green-900 mb-2">Bakgrundsbild</label>
  <input 
    type="file"
    accept="image/*"
    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
    className="w-full border rounded p-2"
  />
</div>
<button
  type="button"
  onClick={handleUploadImage}
  className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-600 mb-4"
>
  Ladda upp bild
</button>
  </main>
);

}