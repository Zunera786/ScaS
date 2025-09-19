// src/controllers/weather.controller.js
import WeatherSnapshot from '../models/WeatherSnapshot.js';
import { getOneCall } from '../services/weather.js';
import { weatherAdvisory } from '../services/gemini.js';

export async function current(req, res) {
  const { lat, lon, units = 'metric', exclude = 'minutely' } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: 'lat and lon required' });

  const data = await getOneCall({
    lat,
    lon,
    units,
    exclude,
    apiKey: process.env.OPENWEATHER_API_KEY
  });

  await WeatherSnapshot.create({
    userId: req.user?.id || null,
    lat: Number(lat),
    lon: Number(lon),
    payload: data
  });

  return res.json(data);
}

export async function advisory(req, res) {
  const { lat, lon, crop, language } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: 'lat and lon required' });
  const weather = await getOneCall({
    lat,
    lon,
    units: 'metric',
    exclude: 'minutely',
    apiKey: process.env.OPENWEATHER_API_KEY
  });
  const summary = await weatherAdvisory({ weatherJson: weather, crop, language });
  return res.json({ weather, advisory: summary.advisoryText });
}
