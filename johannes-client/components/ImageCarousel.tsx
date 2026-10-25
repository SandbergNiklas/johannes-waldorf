'use client'
import { useState, useEffect } from 'react';
import { Image } from '@/types';

interface ImageProps {images : Image[]
}



export default function ImageCarousel({images} : ImageProps ) {
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
    const timer = setInterval(() => {
    setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
  }, 5000); 

  return () => clearInterval(timer); // cleanup!
   
}, [images.length]);
 if(images.length === 0){  return null;}
  
  return (
    <div className="relative h-full">
      {/* Bilden */}
        <img
            src={`http://localhost:5058${images[currentIndex].url}`}
            alt={images[currentIndex].altText}
            className="w-full h-full object-cover"
        />
        {/* Föregående knapp */}
        <button
        type="button"
        onClick={() => setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-6xl font-bold hover:text-green-300 transition-colors duration-200 drop-shadow-lg cursor-pointer"
        >
            ←
         </button>
         {/* Nästa knapp */}
        <button
            type="button"
            onClick={() => setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2  text-white text-6xl font-bold hover:text-green-300 transition-colors duration-200 drop-shadow-lg cursor-pointer"
        >
            →
        </button>
        {/* Bildräknare */}
      <div className="absolute bottom-16 left-1/2 -translate-y-1/2 text-white text-4xl font-waldorf">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
    );
    
    }

    
