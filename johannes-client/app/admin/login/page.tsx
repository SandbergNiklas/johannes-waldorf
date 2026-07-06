'use client'
import {useState} from 'react';
import { useRouter } from 'next/navigation';
interface LoginResponse {
    token: string;

}
export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] =useState('');
    const router = useRouter();
    async function handleLogin(){
        const response = await fetch('http://localhost:5058/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type':'application/json'}, 
            body: JSON.stringify({userName: email, password: password})
        });
        if(!response.ok){
            alert('Fel användarnamn eller lösenord');
            return;
        }
        const loginResponse: LoginResponse = await response.json();
        localStorage.setItem('token', loginResponse.token);
        
        router.push('/admin');
        
        console.log(email, password);
    }
          
        return (<>
  <main className="max-w-md mx-auto mt-16 p-8">
    <h1 className=" font-waldorf text-3xl text-green-900 mb-8">
      Admin Login
    </h1>
    <div className="mb-4">
      <label className=" font-waldorf block text-green-900 mb-2">Email</label>
      <input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border rounded p-2"
      />
    </div>
    <div className="mb-4">
      <label className="font-waldorf block text-green-900 mb-2">Lösenord</label>
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border rounded p-2"
      />
    </div>
    <button 
      type="button" 
      onClick={handleLogin}
      className="font-waldorf bg-green-900 text-white px-6 py-2 rounded w-full"
    >
      Logga in
    </button>
  </main>
  </>
);
    
    
}
