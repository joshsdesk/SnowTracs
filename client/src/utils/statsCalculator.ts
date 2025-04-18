// client/src/utils/statsCalculator.ts

import { Segment, SessionStats, TrackPoint } from './trackSession';

// Haversine formula to calculate distance between two lat/lng points
const toRad = (value: number) => (value * Math.PI) / 180;

const getDistance = (p1: TrackPoint, p2: TrackPoint): number => {
  const R = 6371e3; // Earth radius in meters
  const φ1 = toRad(p1.latitude);
  const φ2 = toRad(p2.latitude);
  const Δφ = toRad(p2.latitude - p1.latitude);
  const Δλ = toRad(p2.longitude - p1.longitude);

  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // in meters
};

export const calculateStats = (segments: Segment[]): SessionStats => {
  let totalDistance = 0;
  let maxSpeed = 0;
  let elevationGain = 0;
  let elevationLoss = 0;
  let activeDuration = 0;
  let numRuns = 0;
  let speedSum = 0;
  let speedCount = 0;

  for (const segment of segments) {
    if (segment.type === 'run') numRuns++;

    for (let i = 1; i < segment.points.length; i++) {
      const p1 = segment.points[i - 1];
      const p2 = segment.points[i];

      const dist = getDistance(p1, p2);
      totalDistance += dist;

      const elevationDiff = p2.elevation - p1.elevation;
      if (elevationDiff > 0) elevationGain += elevationDiff;
      else elevationLoss += Math.abs(elevationDiff);

      if (p2.speed > maxSpeed) maxSpeed = p2.speed;
      if (p2.speed > 0) {
        speedSum += p2.speed;
        speedCount++;
      }
    }

    const segmentStart = new Date(segment.startTime).getTime();
    const segmentEnd = new Date(segment.endTime).getTime();
    activeDuration += (segmentEnd - segmentStart);
  }

  return {
    totalDistance: parseFloat((totalDistance / 1000).toFixed(2)), // in km
    totalDuration: parseFloat((activeDuration / 1000 / 60).toFixed(2)), // in minutes
    maxSpeed: parseFloat(maxSpeed.toFixed(2)),
    averageSpeed: speedCount ? parseFloat((speedSum / speedCount).toFixed(2)) : 0,
    elevationGain: parseFloat(elevationGain.toFixed(2)),
    elevationLoss: parseFloat(elevationLoss.toFixed(2)),
    numRuns
  };
};
