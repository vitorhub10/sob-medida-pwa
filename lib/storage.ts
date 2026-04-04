'use client';

import { useEffect, useState } from 'react';

export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored) {
        setState(JSON.parse(stored) as T);
      }
    } catch (error) {
      console.error(`Erro ao ler ${key} do localStorage`, error);
    } finally {
      setIsLoaded(true);
    }
  }, [key]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Erro ao salvar ${key} no localStorage`, error);
    }
  }, [isLoaded, key, state]);

  return { state, setState, isLoaded };
}
