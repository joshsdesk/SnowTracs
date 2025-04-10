// ====== Resort Routes: Handle /resort API requests ======
import express from 'express';
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

export default router;
