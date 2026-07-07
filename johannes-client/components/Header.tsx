import Link from 'next/link';
import { Section } from '@/types';
interface HeaderProps {
  sections: Section[];
}

export default function Header({sections}: HeaderProps) {
  return (
    <header className="font-waldorf bg-stone-50 px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-green-900">
        Johannes Waldorfförskolor
      </h1>
      <nav className="flex gap-6">
        {sections.map((section) => (
          <Link key={section.id}
            href={`/#${section.name}`} 
            className="text-green-800 hover:text-green-600"
          >
            {section.title}
          </Link>
        ))}
      </nav>
    </header>
  );
}