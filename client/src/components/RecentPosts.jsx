// src/components/RecentPosts.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import $axios from '../api/axiosInstance';

function RecentPosts({ currentId, categoryId = null, count = 3 }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const params = {
      _embed: '',
      per_page: count + 1, // fetch a little extra to filter
      exclude: currentId
    };
    if (categoryId) params.categories = categoryId;

    $axios.get('/posts', { params })
      .then((res) => {
        const filtered = res.data.filter(post => post.id !== +currentId);
        setPosts(filtered.slice(0, count));
      })
      .catch(console.error);
  }, [currentId, categoryId, count]);

  if (!posts.length) return null; // no peas, don't show

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Recent Posts</h3>
        <Link to="/blog" className="text-sm hover:underline">See All</Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {posts.map(post => {
          const img = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
          return (
            <Link
              key={post.id}
              to={`/post/${post.id}`}
              className="block overflow-hidden border border-gray-300"
            >
              {img && <img src={img} alt={post.title.rendered} className="w-full h-40 object-cover object-top" />}
              <div className="p-4">
                <h4 className="text-lg font-medium">{post.title.rendered}</h4>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default RecentPosts;
