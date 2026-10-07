import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white text-white p-4 w-full h-full flex items-center justify-center dark:bg-black">
      <div className="container mx-auto">
        <Link href="/" className="text-4xl font-bold">
          Students Manager
        </Link>
      </div>
    </nav>
  );
}
