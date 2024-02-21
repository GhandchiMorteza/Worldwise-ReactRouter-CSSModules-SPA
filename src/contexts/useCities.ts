import { createContext, useContext } from 'react';
import { CitiesContextType, CityType } from '../types';
const defaultValue: CitiesContextType = {
  cities: [],
  isLoading: false,
  currentCity: null,
  getCity: (id: string) => {
    return new Promise<void>((resolve) => {
      console.warn(`getCity called without a provider ${id}`);
      resolve();
    });
  },
  createCity: (newCity: CityType) => {
    return new Promise<void>((resolve) => {
      console.warn(`getCity called without a provider ${newCity.cityName}`);
      resolve();
    });
  },
  deleteCity: (id: string) => {
    return new Promise<void>((resolve) => {
      console.warn(`getCity called without a provider ${id}`);
      resolve();
    });
  },
};

const CitiesContext = createContext<CitiesContextType>(defaultValue);

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error('CitiesContext was used outside the CitiesProvider');
  return context;
}

export { useCities, CitiesContext };
