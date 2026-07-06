'use client'
import { useEffect, useState } from 'react';
import {useRouter} from 'next/navigation';
import {Section} from '@/types'; 
export default function AdminPage(){
    const router = useRouter();
    const [sections, setSections] = useState<Section[]>([]);
    
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
    }, []);

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
    </main>
    );
}