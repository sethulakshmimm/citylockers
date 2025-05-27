import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white py-4 shadow mb-8 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">🔒</span>
          <span className="text-2xl font-bold tracking-tight" style={{fontFamily: 'Segoe UI, Arial, Helvetica, sans-serif'}}>City Lockers</span>
        </div>
        <div className="flex space-x-4">
          <Link
            href="/units"
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold px-5 py-2 rounded-full shadow transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-blue-600"
          >
            Units
          </Link>
          <Link
            href="/bookings"
            className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold px-5 py-2 rounded-full shadow transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-green-300 border border-green-600"
          >
            My Bookings
          </Link>
        </div>
      </div>
    </nav>
  );
}
