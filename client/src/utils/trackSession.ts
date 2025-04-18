// client/src/utils/trackSession.ts

import { v4 as uuidv4 } from 'uuid';
import { calculateStats } from './statsCalculator';

export type TrackPoint = {
  latitude: number;
  longitude: number;
  elevation: number;
  timestamp: string;
  speed: number;
  heading?: number | null;
};

export type SegmentType = 'run' | 'lift' | 'rest';

export type Segment = {
  type: SegmentType;
  startTime: string;
  endTime: string;
  points: TrackPoint[];
};

export type SessionStats = {
  totalDistance: number;
  totalDuration: number;
  maxSpeed: number;
  averageSpeed: number;
  elevationGain: number;
  elevationLoss: number;
  numRuns: number;
};

export type SessionData = {
  id: string;
  userId: string;
  startTime: string;
  endTime: string | null;
  segments: Segment[];
  mode: 'ski' | 'snowboard' | null;
  notes: string;
  stats: SessionStats;
  mapSnapshotUrl?: string | null;
};

// === Finalizes and builds a completed session ===
export const finishSession = (
  segments: Segment[],
  userId: string
): SessionData => {
  const now = new Date().toISOString();

  return {
    id: uuidv4(),
    userId,
    startTime: segments[0]?.startTime || now,
    endTime: now,
    segments,
    mode: null, // to be selected in modal
    notes: '',
    stats: calculateStats(segments),
    mapSnapshotUrl: null
  };
};
