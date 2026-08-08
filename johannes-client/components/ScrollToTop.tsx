'use client'
import {useState, useEffect} from 'react';

export default function ScrollToTop(){
    const [visible, setVisible] = useState(false);

    useEffect(()=> {
        const handelScroll = () => {
            setVisible(window.scrollY >300);
        };
        window.addEventListener('scroll', handelScroll);
        return ()=> window.removeEventListener('scroll', handelScroll);
    }, []);
    if(!visible) return null;

    return(
        <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="font-waldorf fixed bottom-8 right-8 bg-green-900 text-white p-3 rounded-full shadow-lg hover:bg-green-800"
        type="button"
        >
        Toppen
        </button>

    )
}