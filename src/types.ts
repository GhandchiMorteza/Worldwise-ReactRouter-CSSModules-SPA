interface CityType {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id?: string;
}

interface Country {
  emoji: string;
  country: string;
  id: number;
}

interface CitiesContextType {
  cities: CityType[];
  isLoading: boolean;
  currentCity: CityType | null;
  getCity: (id: string) => Promise<void>;
  createCity: (newCity: CityType) => Promise<void>;
  deleteCity: (id: string) => Promise<void>;
}

interface GeolocationResponse {
  latitude: number;
  lookupSource: string;
  longitude: number;
  localityLanguageRequested: string;
  continent: string;
  continentCode: string;
  countryName: string;
  countryCode: string;
  principalSubdivision: string;
  principalSubdivisionCode: string;
  city: string;
  locality: string;
  postcode: string;
  plusCode: string;
  fips?: {
    state: string;
    county: string;
    countySubdivision: string;
    place: string;
  };
  csdCode?: string;
  localityInfo: {
    administrative: {
      name: string;
      description: string;
      isoName: string;
      order: number;
      adminLevel: number;
      isoCode: string;
      wikidataId: string;
      geonameId: number;
    }[];
    informative: {
      name: string;
      description: string;
      isoName?: string;
      order: number;
      isoCode?: string;
      wikidataId?: string;
      geonameId?: number;
    }[];
  };
}

export type { CityType, CitiesContextType, Country, GeolocationResponse };
