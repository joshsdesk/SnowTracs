
import express from 'express';
import { getMapData } from '../controllers/mapController';

const router = express.Router();

router.get('/', getMapData);

export default router;
