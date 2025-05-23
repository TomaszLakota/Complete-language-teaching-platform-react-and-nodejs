import express from 'express';
import { handleStripeWebhook } from '../controllers/webhook.controller.js';
import { zeroLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.use('/webhook', zeroLimiter);

// Debug middleware
router.use('/webhook', (req, res, next) => {
  console.log('[DEBUG] Webhook route hit');
  console.log('[DEBUG] Headers:', req.headers);
  console.log('[DEBUG] Raw body available:', !!req.body);
  next();
});

// Stripe webhook handler - use raw body parser
router.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

export default router;
