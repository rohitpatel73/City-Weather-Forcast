// /pages/index.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { City } from '../utils/types';
import CityTable from '../components/CityTable';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const [cities, setCities] = useState<City[]>([]);
  const [query, setQuery] = useState('');
  const [offset, setOffset] = useState(0);

  const fetchCities = async () => {
    const response = await axios.get(
      `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&rows=50&start=${offset}&q=${query}`
    );
    const newCities = response.data.records.map((record: any) => ({
      id: record.recordid,
      name: record.fields.name,
      country: record.fields.cou_name_en,
      timezone: record.fields.timezone,
      coordinates: {
        lat: record.fields.coordinates[0],
        lon: record.fields.coordinates[1],
      },
    }));
    setCities(prev => [...prev, ...newCities]);
    setOffset(prev => prev + 50);
  };

  useEffect(() => {
    setCities([]);
    setOffset(0);
    fetchCities();
  }, [query]);

  return (
    <div className="p-4 min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <SearchBar onSearch={setQuery} />
      <InfiniteScroll
        dataLength={cities.length}
        next={fetchCities}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <CityTable cities={cities} />
      </InfiniteScroll>
    </div>
  );
}
