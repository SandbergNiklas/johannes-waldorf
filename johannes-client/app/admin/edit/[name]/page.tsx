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
  </main>
);

}