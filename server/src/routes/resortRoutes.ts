// ====== Resort Routes: Handle /resort API requests ======
import express from 'express';
import path from 'path';
import fs from 'fs';
import { getResortInfo, getResortDetails } from '../controllers/resortController';

const router = express.Router();

// @route   GET /resort?name=Vail
// @desc    Get list of resorts matching the name
// @access  Public
router.get('/', getResortInfo);

// @route   GET /resort/details?slug=breckenridge
// @desc    Get detailed resort stats (lifts, trails, snow, etc.)
// @access  Public
router.get('/details', getResortDetails);

// @route   GET /resorts
// @desc    Serve full JSON data of all resorts
// @access  Public
router.get('/resorts', (req, res) => {
  const filePath = path.join(__dirname, '../../data/colorado_resorts.json');

  fs.readFile(filePath, 'utf-8', (err, json) => {
    if (err) {
      console.error('Failed to read resort JSON:', err);
      return res.status(500).json({ error: 'Failed to load resort data' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(json);
  });
});

export default router;
