import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { createPost, fetchposts } from '../actions';
import Post from './Post';
import { createNewPost, getAllPosts } from '../fetch';
import { Redirect } from 'react-router-dom';

function CreatePosts(props) {
  const [postContent, setPostContent] = useState('');
  const dispatch = useDispatch();
  const [postImage, setPostImage] = useState(null);
  const user = useSelector(store => store.userDetails)
  const user_id = user.id;
  const [toRedirect, setRedirect] = useState(false);

  function handleFormSubmission(event) {
    event.preventDefault();
    user_id ? createNewPost(user_id, postContent, postImage, data => data.status === 200 ? dispatch(createPost(data.post_details)) : setRedirect(true)) : console.error('Error');
  }

  if (!toRedirect) {
    return (
      <React.Fragment>
        <h1>To Create</h1>
        <form onSubmit={handleFormSubmission}>
          <textarea name='post_content' value={postContent} onChange={event => setPostContent(event.target.value)} placeholder={`What's going on ${user_id ? user.firstName : ''}??`} />
          <input name='postImage' type='file' accept='image/*' onChange={event => setPostImage(event.target.files[0])} />
          <button type='submit'>POST</button>
        </form>
      </React.Fragment>
    )
  } else {
    return <Redirect to='/login' />
  }
}

function AllPosts(props) {
  const allPosts = useSelector(store => store.posts)
  const [lastPost, setLastPost] = useState(1);
  
  const dispatch = useDispatch();
  useEffect(() => {
    getAllPosts(lastPost, data => dispatch(fetchposts(data.posts)));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <React.Fragment>
      <h1>Posts</h1>
      { allPosts.map((post, index) => <Post key={index} postDetails={post} />)}
    </React.Fragment>
  )

}

function WrapperFunction(props) {
  return (
    <React.Fragment>
      <CreatePosts />
      <AllPosts />
    </React.Fragment>
  )
}
export default WrapperFunction