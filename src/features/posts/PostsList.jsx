import {useSelector, useDispatch} from 'react-redux'
import { selectAllPosts, getPostsError, getPostsStatus, fetchPosts } from './postsSlice'
import React, { useEffect, useRef } from 'react'
import PostExcerpt from './PostExcerpt'

const PostsList = () => {
  const dispatch = useDispatch()
  const posts= useSelector(selectAllPosts)
  const postStatus= useSelector(getPostsStatus)
  const error= useSelector(getPostsError)

  const renderAfterCalled = useRef(false);
  useEffect(() => {
    if(!renderAfterCalled.current) {
      if (postStatus === 'idle') {
      dispatch(fetchPosts())}
    }
    renderAfterCalled.current = true;
}, [postStatus, dispatch])

let content;
if (postStatus === 'loading') {
    content = <p>"Loading..."</p>;
} else if (postStatus === 'succeeded') {
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    content = orderedPosts.map(post => <PostExcerpt key={post.id} post={post} />)
} else if (postStatus === 'failed') {
    content = <p>{error}</p>;
}
        
    

  return (
    <section>
        <h2>Posts</h2>
        {content}
    </section>
  )
}

export default PostsList