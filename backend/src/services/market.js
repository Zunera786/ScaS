// src/services/market.js
import MarketSnapshot from '../models/MarketSnapshot.js';

export async function saveMarketSnapshot({ userId, region, prices, source }) {
  const doc = await MarketSnapshot.create({ userId, region, prices, source });
  return doc;
}

export async function getLatestPrices({ userId, region, commodity }) {
  const q = { userId, region };
  const doc = await MarketSnapshot.findOne(q).sort({ createdAt: -1 });
  if (!doc) return null;
  const prices = commodity
    ? doc.prices.filter(p => p.commodity?.toLowerCase() === commodity.toLowerCase())
    : doc.prices;
  return { ...doc.toObject(), prices };
}
