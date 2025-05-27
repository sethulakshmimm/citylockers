'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Book() {
  const router = useRouter();
  const params = useSearchParams();
  const unitId = params.get('unitId') || '';
  const [userName, setUserName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!userName || !unitId || !startDate || !endDate) {
      setError('All fields are required');
      return;
    }
    if (startDate > endDate) {
      setError('End date must be after start date');
      return;
    }
    const res = await fetch('http://localhost:4000/api/book', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ userName, unitId, startDate, endDate })
    });
    if (res.ok) {
      setMessage('Booking successful!');
    } else {
      const data = await res.json();
      setError(data.error || 'Booking failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg border border-blue-100 opacity-0 animate-fadein hover:scale-[1.02] transition-all duration-200">
        <div className="flex justify-between items-center mb-6">
          <a href="/units" className="text-blue-600 hover:underline flex items-center"><span className="mr-2">🏠</span>Home</a>
          <h1 className="text-4xl font-black text-blue-900 text-center flex-1" style={{fontFamily: 'Segoe UI, Arial, Helvetica, sans-serif'}}>Book Storage Unit</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Your Name</label>
            <input className="border px-3 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400" value={userName} onChange={e => setUserName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Start Date</label>
            <input type="date" className="border px-3 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400" value={startDate} onChange={e => setStartDate(e.target.value)} required />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">End Date</label>
            <input type="date" className="border px-3 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400" value={endDate} onChange={e => setEndDate(e.target.value)} required />
          </div>
          <input type="hidden" value={unitId} />
          <button className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold px-5 py-2 rounded-lg transition-all w-full text-center mt-2 shadow-md" type="submit">Book</button>
        </form>
        {message && <p className="text-green-600 mt-4 text-center font-semibold">{message}</p>}
        {error && <p className="text-red-600 mt-4 text-center font-semibold">{error}</p>}
      </div>
      <style>{`.animate-fadein {animation: fadein 0.7s forwards;} @keyframes fadein {to {opacity: 1;}}`}</style>
    </div>
  );
}
