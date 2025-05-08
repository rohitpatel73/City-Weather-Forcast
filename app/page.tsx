// Home.tsx
"use client"; 

import CityTable from './components/CityTables';
import 'leaflet/dist/leaflet.css';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-zinc-800 text-sky-600 p-4">
        <h1 className="text-3xl font-bold text-center">City Weather App</h1>
      </header>

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-800">Cities</h2>
          <CityTable />
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-auto">
        <div className="text-center">
          <p>&copy; 2025 My App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
