import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import AirportsList from '../components/AirportsList/AirportsList';
import Layout from '../components/Layout/Layout';
import SearchInput from '../components/SearchInput/SearchInput';
import useApiData from '../hooks/use-api-data';
import Airport from '../types/airport';

const Page: NextPage = () => {
  const [searchField, setSearchField] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPage(page => page + 1);
      setLimit(limit => limit + 10);
    }
  }

  useEffect(() => {

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const airports = useApiData<Airport[]>(`/api/airports?page=${page}&limit=${limit}`, []);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
  };

  const filteredAirports = airports.filter(
    (airport) =>
      airport.name.toLowerCase().includes(searchField.toLowerCase()) ||
      airport.iata.toLowerCase().includes(searchField.toLowerCase())
  );

  return (
    <Layout>
      <h1 className="text-4xl font-bold">DBL Code Challenge: Airports</h1>

      <SearchInput searchChange={onSearchChange} />

      <h2 className="mt-10 text-2xl font-bold">
        Airports <span className='text-sm border rounded-xl bg-blue-500 text-white px-3 py-1 ml-2 font-light'>{airports.length}</span>
      </h2>

      <AirportsList airports={filteredAirports} />
    </Layout>
  );
};

export default Page;
