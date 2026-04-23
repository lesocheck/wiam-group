import { useState, useEffect } from 'react';
import { API } from '../api/endpoints';

let categoriesCache: string[] | null = null;
let pendingRequest: Promise<string[]> | null = null;

export function useCategories() {
  const [categories, setCategories] = useState<string[]>(categoriesCache ?? []);
  const [loading, setLoading] = useState<boolean>(!categoriesCache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    if (categoriesCache) {
      setCategories(categoriesCache);
      setLoading(false);
      return;
    }

    if (!pendingRequest) {
      pendingRequest = fetch(API.CATEGORY_LIST)
        .then((res) => {
          if (!res.ok) throw new Error('Network error');
          return res.json() as Promise<string[]>;
        })
        .then((data) => {
          categoriesCache = data;
          return data;
        })
        .catch((err) => {
          pendingRequest = null;
          throw err;
        });
    }

    pendingRequest
      .then((data) => {
        if (alive) { setCategories(data); setLoading(false); }
      })
      .catch(() => {
        if (alive) { setError('Не удалось загрузить список категорий'); setLoading(false); }
      });

    return () => { alive = false; };
  }, []);

  return { categories, loading, error };
}
