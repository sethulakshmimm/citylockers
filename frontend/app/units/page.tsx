'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface StorageUnit {
  id: number;
  name: string;
  size: string;
  location: string;
  price_per_day: string;
  is_available: boolean;
}

export default function Units() {
  const [units, setUnits] = useState<StorageUnit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/api/units')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setUnits(data);
        } else if (data && Array.isArray(data.units)) {
          setUnits(data.units);
        } else {
          setUnits([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch units');
        setLoading(false);
      });
  }, []);

  const filteredUnits = units.filter(
    u =>
      u.location.toLowerCase().includes(search.toLowerCase()) ||
      u.size.toLowerCase().includes(search.toLowerCase()) ||
      u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-black mb-8 text-center text-blue-900 tracking-tight" style={{fontFamily: 'Segoe UI, Arial, Helvetica, sans-serif'}}>Available Storage Units</h1>
      <div className="flex justify-center mb-8">
        <input
          className="border px-4 py-2 rounded-lg w-full max-w-xs shadow focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          placeholder="Search by location, size, or name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {loading && <div className="text-center text-lg text-gray-500">Loading...</div>}
      {error && <div className="text-center text-red-600 font-semibold">{error}</div>}
      {!loading && !error && filteredUnits.length === 0 && (
        <div className="text-center text-gray-400 mt-12">No storage units found.</div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredUnits.map(unit => (
          <div
            key={unit.id}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col border border-blue-100 hover:scale-[1.03] hover:shadow-2xl transition-all duration-200 opacity-0 animate-fadein"
            style={{animationDelay: `${unit.id * 60}ms`}}
          >
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2 text-blue-800" style={{fontFamily: 'Segoe UI, Arial, Helvetica, sans-serif'}}>{unit.name}</h2>
              <div className="mb-1 text-gray-700"><span className="font-semibold">Size:</span> {unit.size}</div>
              <div className="mb-1 text-gray-700"><span className="font-semibold">Location:</span> {unit.location}</div>
              <div className="mb-4 text-gray-700"><span className="font-semibold">Price/Day:</span> <span className="text-green-700 font-bold">${unit.price_per_day}</span></div>
              {unit.is_available ? (
                <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">Available</span>
              ) : (
                <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">Not available</span>
              )}
              {unit.is_available && (
                <Link href={`/book?unitId=${unit.id}`}
                  className="inline-block bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold px-5 py-2 rounded-lg transition-all w-full text-center mt-2 shadow-md">
                  Book Now
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
      <style>{`.animate-fadein {animation: fadein 0.7s forwards;} @keyframes fadein {to {opacity: 1;}}`}</style>
    </div>
  );
}
