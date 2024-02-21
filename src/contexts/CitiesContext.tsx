import { useEffect, useReducer } from 'react';
import { CitiesContext } from './useCities';
import { CityType } from '../types';

const BASE_URL = 'http://localhost:9000';

interface StateType {
  cities: CityType[];
  isLoading: boolean;
  currentCity: CityType | null;
  error: string;
}

type ActionType =
  | { type: 'loading' }
  | { type: 'cities/loaded'; payload: CityType[] }
  | { type: 'city/created'; payload: CityType } // Assuming payload structure for creation
  | { type: 'city/deleted'; payload: string } // Assuming payload structure for deletion
  | { type: 'rejected'; payload: string }
  | { type: 'city/loaded'; payload: CityType };

const initialState = {
  cities: [] as CityType[],
  isLoading: false,
  currentCity: null,
  error: '',
};

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload };
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
        cities: [...state.cities, action.payload],
      };
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((value) => value.id !== action.payload),
      };
    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error('Unknown action type');
  }
}

interface Props {
  children: React.ReactNode;
}

function CitiesProvider({ children }: Props) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({
        type: 'loading',
      });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = (await res.json()) as CityType[];
        dispatch({
          type: 'cities/loaded',
          payload: data,
        });
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading cities...',
        });
      }
    }
    void fetchCities();
  }, []);

  async function getCity(id: string) {
    dispatch({
      type: 'loading',
    });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = (await res.json()) as CityType;
      dispatch({
        type: 'city/loaded',
        payload: data,
      });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading the city...',
      });
    }
  }

  async function createCity(newCity: CityType) {
    dispatch({
      type: 'loading',
    });
    try {
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = (await res.json()) as CityType;
      dispatch({ type: 'city/created', payload: data });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating the city...',
      });
    }
  }

  async function deleteCity(id: string) {
    dispatch({
      type: 'loading',
    });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({
        type: 'city/deleted',
        payload: id,
      });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting the city...',
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider };
