import Link from 'next/link';

export default function Header() {
  return (
    <header className="font-waldorf bg-stone-50 px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-green-900">
        Johannes Waldorfförskolor
      </h1>
      <nav className="flex gap-6">
        <Link href="/#om-johannes" className="text-green-800 hover:text-green-600">Om oss</Link>
        <Link href="/#infomoten" className="text-green-800 hover:text-green-600">Infomöten</Link>
        <Link href="/#anmalan" className="text-green-800 hover:text-green-600">Anmälan</Link>
        <Link href="/#kontakt" className="text-green-800 hover:text-green-600">Kontakt</Link>
      </nav>
    </header>
  );
}