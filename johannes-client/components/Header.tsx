export default function Header() {
  return (
    <header className="bg-stone-50 px-8 py-4 flex justify-between items-center">
      <h1 style={{fontFamily: 'Antropos'}} className="text-2xl font-bold text-green-900">
        Johannes Waldorfförskolor
      </h1>
      <nav style={{fontFamily: 'Antropos'}} className="flex gap-6">
        <a href="#om-johannes" className="text-green-800 hover:text-green-600">Om oss</a>
        <a href="#infomoten" className="text-green-800 hover:text-green-600">Infomöten</a>
        <a href="#anmalan" className="text-green-800 hover:text-green-600">Anmälan</a>
        <a href="#kontakt" className="text-green-800 hover:text-green-600">Kontakt</a>
      </nav>
    </header>
  );
}