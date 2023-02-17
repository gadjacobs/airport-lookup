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
  const [loading, setLoading] = useState(false);

  const airports = useApiData<Airport[]>(
    `/api/airports?page=${page}&limit=${limit}&query=${searchField}`,
    []
  );

  function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setLoading(true);
      setTimeout(() => {
        setPage((page) => page + 1);
        setLimit((limit) => limit + 10);
        setLoading(false);
      }, 1000);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
    setPage(1);
  };

  return (
    <Layout>
      <h1 className="text-4xl font-bold">DBL Code Challenge: Airports</h1>

      <SearchInput searchChange={onSearchChange} />

      <h2 className="mt-10 text-2xl font-bold">
        Airports{' '}
        <span className="text-sm border rounded-xl bg-blue-500 text-white px-3 py-1 ml-2 font-light">
          {airports.length}
        </span>
      </h2>

      <AirportsList airports={airports} loading={loading} />
    </Layout>
  );
};

export default Page;
