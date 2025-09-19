// src/services/weather.js
import axios from 'axios';

const BASE = 'https://api.openweathermap.org/data/3.0/onecall';

export async function getOneCall({ lat, lon, units = 'metric', exclude = 'minutely', apiKey }) {
  if (!apiKey) throw new Error('OPENWEATHER_API_KEY not set');
  const url = `${BASE}?lat=${lat}&lon=${lon}&units=${units}&exclude=${exclude}&appid=${apiKey}`;
  const { data } = await axios.get(url);
  return data;
}
