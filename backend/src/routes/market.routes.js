// src/routes/market.routes.js
import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { authRequired } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { saveSnapshot, latestPrices, recommend } from '../controllers/market.controller.js';

const router = Router();

router.post(
  '/snapshot',
  authRequired,
  [
    body('region').isString(),
    body('prices').isArray(),
    body('source').optional().isString()
  ],
  validate,
  saveSnapshot
);

router.get(
  '/:region/latest',
  authRequired,
  [param('region').isString(), query('commodity').optional().isString()],
  validate,
  latestPrices
);

router.post(
  '/recommend',
  authRequired,
  [
    body('region').isString(),
    body('priceSeries').isArray(),
    body('language').optional().isString()
  ],
  validate,
  recommend
);

export default router;
