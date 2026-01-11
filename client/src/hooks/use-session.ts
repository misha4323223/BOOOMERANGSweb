import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

export function useSession() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    let stored = localStorage.getItem('bmg_session_id');
    if (!stored) {
      stored = nanoid();
      localStorage.setItem('bmg_session_id', stored);
    }
    setSessionId(stored);
  }, []);

  return sessionId;
}
