interface City {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id: number;
}

interface Country {
  emoji: string;
  country: string;
  id: number;
}

interface CitiesContextType {
  cities: City[];
  isLoading: boolean;
}

export type { City, CitiesContextType, Country };
