// client/src/utils/sessionStore.ts

import { SessionData } from './trackSession';

const STORAGE_KEY = 'snowtracs_sessions';

export const saveSession = async (session: SessionData) => {
  const existing = await getAllSessions();
  existing.push(session);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
};

export const getAllSessions = async (): Promise<SessionData[]> => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getSessionById = async (id: string): Promise<SessionData | undefined> => {
  const sessions = await getAllSessions();
  return sessions.find((s) => s.id === id);
};

export const clearSessions = async () => {
  localStorage.removeItem(STORAGE_KEY);
};
