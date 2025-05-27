'use client';
import { useState } from 'react';

interface Booking {
  id: number;
  unit_name: string;
  location: string;
  size: string;
  price_per_day: string;
  start_date: string;
  end_date: string;
}

export default function Bookings() {
  const [userName, setUserName] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    setError('');
    setBookings([]);
    if (!userName) {
      setError('Enter your name');
      return;
    }
    const res = await fetch(`http://localhost:4000/api/bookings?userName=${encodeURIComponent(userName)}`);
    if (res.ok) {
      setBookings(await res.json());
    } else {
      setError('Failed to fetch bookings');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl border border-blue-100 opacity-0 animate-fadein hover:scale-[1.01] transition-all duration-200">
        <div className="flex justify-between items-center mb-6">
          <a href="/units" className="text-blue-600 hover:underline flex items-center"><span className="mr-2">🏠</span>Home</a>
          <h1 className="text-4xl font-black text-blue-900 text-center flex-1" style={{fontFamily: 'Segoe UI, Arial, Helvetica, sans-serif'}}>Your Bookings</h1>
        </div>
        <div className="flex flex-col sm:flex-row items-center mb-6 gap-4">
          <input className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1" placeholder="Your Name" value={userName} onChange={e => setUserName(e.target.value)} />
          <button className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold px-5 py-2 rounded-lg transition-all w-full sm:w-auto shadow-md" onClick={fetchBookings}>Show My Bookings</button>
        </div>
        {error && <div className="text-red-600 text-center font-semibold mb-4">{error}</div>}
        {bookings.length === 0 && !error && (
          <div className="text-gray-400 text-center">No bookings found.</div>
        )}
        {bookings.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden mt-4 shadow">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-4">Unit</th>
                  <th className="py-2 px-4">Location</th>
                  <th className="py-2 px-4">Size</th>
                  <th className="py-2 px-4">Price/Day</th>
                  <th className="py-2 px-4">Start</th>
                  <th className="py-2 px-4">End</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id} className="hover:bg-blue-50">
                    <td className="py-2 px-4">{b.unit_name}</td>
                    <td className="py-2 px-4">{b.location}</td>
                    <td className="py-2 px-4">{b.size}</td>
                    <td className="py-2 px-4">${b.price_per_day}</td>
                    <td className="py-2 px-4">{b.start_date}</td>
                    <td className="py-2 px-4">{b.end_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <style>{`.animate-fadein {animation: fadein 0.7s forwards;} @keyframes fadein {to {opacity: 1;}}`}</style>
    </div>
  );
}
