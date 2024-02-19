import { createContext, useContext } from 'react';
import { CitiesContextType } from '../types';
const defaultValue: CitiesContextType = {
  cities: [],
  isLoading: false,
};

const CitiesContext = createContext<CitiesContextType>(defaultValue);

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error('CitiesContext was used outside the CitiesProvider');
  return context;
}

export { useCities, CitiesContext };
