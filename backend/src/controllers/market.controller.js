// src/controllers/market.controller.js
import { saveMarketSnapshot, getLatestPrices } from '../services/market.js';
import { marketRecommendation } from '../services/gemini.js';

export async function saveSnapshot(req, res) {
  const { region, prices, source } = req.body;
  const doc = await saveMarketSnapshot({
    userId: req.user.id,
    region,
    prices,
    source: source || 'manual_or_external_ingest'
  });
  return res.status(201).json(doc);
}

export async function latestPrices(req, res) {
  const { region } = req.params;
  const { commodity } = req.query;
  const doc = await getLatestPrices({
    userId: req.user.id,
    region,
    commodity
  });
  if (!doc) return res.status(404).json({ error: 'No snapshot found' });
  return res.json(doc);
}

export async function recommend(req, res) {
  const { region, priceSeries, language } = req.body;
  const result = await marketRecommendation({ region, priceSeries, language });
  return res.json(result);
}
