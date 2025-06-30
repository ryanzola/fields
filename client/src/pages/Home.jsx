import { useEffect, useState } from 'react';

import $axios from '../api/axiosInstance';

function Home() {
  const [page, setPage] = useState(null);

  useEffect(() => {
    $axios.get('/pages?slug=home-page&_embed')
      .then((res) => {
        setPage(res.data[0]); // API returns an array of matching pages
      })
      .catch(console.error);
  }, []);

  if (!page) return <p>Loading…</p>;

  return (
    <div className="post page-body space-y-16">
      <h1 className="sr-only">{page.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
    </div>
  );
}

export default Home;
