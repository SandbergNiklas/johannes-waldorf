import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="mt-16 py-8 border-t border-stone-200 text-center">
      <p className="text-stone-400 text-sm">
        © {new Date().getFullYear()} Johannes Waldorfförskolor
      </p>
      
        <Link href="/admin/login" 
        className="text-stone-300 text-xs hover:text-stone-400 mt-2 inline-block"
        >
        Admin
      </Link>
       
   
    </footer>
  );
}