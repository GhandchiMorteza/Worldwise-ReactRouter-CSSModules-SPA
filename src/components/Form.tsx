// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';

import styles from './Form.module.css';
import Button from './Button';
import BackButton from './BackButton';
import { useUrlPosition } from '../hooks/useUrlPostion';
import { CityType, GeolocationResponse } from '../types';
import Message from './Message';
import Spinner from './Spinner';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useCities } from '../contexts/useCities';
import { useNavigate } from 'react-router-dom';

export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [emoji, setEmoji] = useState('');
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState('');
  const { createCity, isLoading } = useCities();

  const navigate = useNavigate();

  useEffect(
    function () {
      if (!lat && !lng) {
        return;
      }

      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          setGeocodingError('');
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = (await res.json()) as GeolocationResponse;

          if (!data.countryCode) {
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else 😊 "
            );
          }

          setCityName(data.city || data.locality || '');
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (error) {
          if (error instanceof Error) {
            setGeocodingError(error.message);
          } else {
            setGeocodingError('An unknown error occurred');
          }
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      void fetchCityData();
    },
    [lat, lng]
  );

  async function handleSubmit(e: Event) {
    e.preventDefault();

    if (!cityName || !date) {
      return;
    }

    const isoDateString = date.toISOString();

    const newCity: CityType = {
      cityName,
      country,
      emoji,
      date: isoDateString,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate('/app/cities');
  }

  if (!lat && !lng) {
    const message = 'Start by clicking somewhere on the map';
    return <Message message={message} />;
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (geocodingError) {
    return <Message message={geocodingError} />;
  }

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat={'dd / MM / yyyy'}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={() => console.log('hll')}>
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
