// src/routes/soil.routes.js
import { Router } from 'express';
import { authRequired } from '../middleware/auth.js';
import { analyze, list } from '../controllers/soil.controller.js';
import multer from 'multer';

const router = Router();
const upload = multer();

router.post(
  '/analyze',
  authRequired,
  upload.single("file"),
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ error: 'File is required' });
    }
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/webp',
      'image/bmp',
      'image/gif'
    ];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ error: 'Only PDF or image files are allowed' });
    }

    console.log("Uploaded file:", req.file.originalname, req.file.mimetype, req.file.size);
    next();
  },
  analyze
);

router.get('/', authRequired, list);

export default router;
