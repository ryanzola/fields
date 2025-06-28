import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePosts } from '../hooks/usePosts'

import ShareModal from '../components/ShareModal';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

function Blog() {
  const { posts, loading, error } = usePosts()
  const [selectedPost, setSelectedPost] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShareClick = (e) => {
    const post_id = e.currentTarget.dataset.id;
    if (!post_id) return;

    setSelectedPost(post_id);
    setIsShareModalOpen(true);
  };

  window.scrollTo(0, 0);

  if (loading) return <div className='page-body p-4'>
  <h1 className='page-header'>Loading...</h1>
  </div>
  if (error) return <div className='page-body p-4'>
  <h1 className='page-header'>Error: {error.message}</h1>
  </div>

  return <>
    <div className="page-body space-y-16">
      <h1 className="page-header">DEV BLOG</h1>

      <div className="max-w-[980px] mx-auto flex flex-col gap-8">
        {posts.map((post) => (
          <div key={post.id} className="post grid grid-cols-1 grid-rows-[1fr_auto] md:grid-cols-[454px_1fr] md:grid-rows-1 border border-gray-300">
            <Link to={`/post/${post.id}`} key={post.id} className="md:h-[340px] md:w-[454px] overflow-hidden relative">
              <img src={post._embedded["wp:featuredmedia"][0]?.source_url} alt={post.title.rendered} className="post-image object-cover object-top w-full h-full" />
            </Link>
            <div className="p-4 space-y-4">
              <div className="flex justify-between">
                { new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                }) }
  
                <button className="h-6 w-6 grid place-items-center rounded-full hover:bg-black/10" data-id={post.id} onClick={handleShareClick}>
                  <FontAwesomeIcon icon={faEllipsisV} />
                  <span className="sr-only">More options</span>
                </button>
              </div>

              <Link to={`/post/${post.id}`} className="space-y-4 block">
                <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>

    <ShareModal
      isOpen={isShareModalOpen}
      onClose={() => {
        setIsShareModalOpen(false)
        setSelectedPost(null);
      }}
      postUrl={`${window.location.origin}/post/${selectedPost || ''}`}
    />
  </>;
}

export default Blog;
