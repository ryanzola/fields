import { useParams } from 'react-router-dom';
import { usePost } from '../hooks/usePost';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";

function Post() {
  const { id } = useParams();
  const { post, loading, error } = usePost(id);

  window.scrollTo(0, 0);

  if (loading) return <div className='page-body p-4'>
  <h1 className='page-header'>Loading...</h1>
  </div>
  if (error) return <div className='page-body p-4'>
  <h1 className='page-header'>Error: {error.message}</h1>
  </div>

  return (
    <div className="post page-body container mx-auto space-y-16">
      <article className="prose px-4 py-4 md:px-16 md:py-8">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm">
            { new Date(post.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
            }) }
          </div>

          <div>
            <button className="text-gray-500 hover:text-gray-700">
              <FontAwesomeIcon icon={faShare} />
            </button>
          </div>
        </div>
        <h1 className='text-4xl mb-8'>{post.title.rendered}</h1>
        <div className='space-y-8' dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </article>
    </div>
  );
}

export default Post;
