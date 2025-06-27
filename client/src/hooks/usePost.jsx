import { useEffect, useState } from 'react';
import $axios from '../api/axiosInstance';

export function usePost(id) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    $axios
      .get(`/posts/${id}?_embed`)
      .then((res) => setPost(res.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [id]);

  return { post, loading, error };
}
