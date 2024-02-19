import styles from './CountryList.module.css';
import { useCities } from '../contexts/useCities';
import Spinner from './Spinner';
import CountryItem from './CountryItem';
import Message from './Message';
import { Country } from '../types';

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message={`Add your first city by clicking on the map`} />;

  const countries: Country[] = cities.reduce((arr: Country[], city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [
        ...arr,
        { country: city.country, emoji: city.emoji, id: city.id + 256 },
      ];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;
