import { Link } from 'react-router-dom'
import { usePosts } from '../hooks/usePosts'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

function Blog() {
  const { posts, loading, error } = usePosts()

  window.scrollTo(0, 0);

  if (loading) return <div className='page-body p-4'>
  <h1 className='page-header'>Loading...</h1>
  </div>
  if (error) return <div className='page-body p-4'>
  <h1 className='page-header'>Error: {error.message}</h1>
  </div>

  return (
    <div className="page-body space-y-16">
      <h1 className="page-header">DEV BLOG</h1>

      <div className='max-w-[980px] mx-auto flex flex-col-reverse gap-8'>
        {posts.map((post) => (
          <Link to={`/post/${post.id}`} key={post.id} className="post grid grid-cols-1 grid-rows-[1fr_auto] md:grid-cols-[454px_1fr] md:grid-rows-1 gap-4 border border-gray-300">
            <div className='md:h-[340px] md:w-[454px] overflow-hidden relative'>
              <img src={post._embedded["wp:featuredmedia"][0].source_url} alt={post.title.rendered} className="post-image object-cover w-full h-full" />
            </div>
            <div className="">
              <div className='p-4 px-8 pb-0 flex justify-between'>
                { new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                }) }
  
                <button>
                  <FontAwesomeIcon icon={faEllipsisV} className="text-gray-500 hover:text-gray-700" />
                  <span className="sr-only">More options</span>
                </button>
              </div>
              <div className='p-8 space-y-4'>
                <h2 className="font-bold text-2xl">{post.title.rendered}</h2>
                <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Blog;
