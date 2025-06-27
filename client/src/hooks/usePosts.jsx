import { useEffect, useState } from 'react';
import $axios from '../api/axiosInstance';

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    $axios
      .get('/posts?_embed')
      .then((res) => setPosts(res.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading, error };
}