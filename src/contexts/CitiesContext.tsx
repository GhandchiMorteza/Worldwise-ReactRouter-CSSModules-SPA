import { useEffect, useState } from 'react';
import { CitiesContext } from './useCities';
import { City } from '../types';

const BASE_URL = 'http://localhost:9000';

interface Props {
  children: React.ReactNode;
}

function CitiesProvider({ children }: Props) {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = (await res.json()) as City[];
        setCities(data);
      } catch {
        alert('There was an error loading data...');
      } finally {
        setIsLoading(false);
      }
    }
    void fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider };
