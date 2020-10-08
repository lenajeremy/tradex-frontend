import React, {useState} from 'react';
import { useSelector, useDispatch } from "react-redux"
import { createPost } from '../actions';
import Post from './Post';
import {createNewPost} from '../fetch';
import {Redirect} from 'react-router-dom';

function CreatePosts(props) {
  const [postContent, setPostContent ] = useState('');
  const dispatch = useDispatch();
  const [postImage, setPostImage] = useState(null);
  const user = useSelector(store => store.userDetails)
  const user_id = user.id;
  const [toRedirect, setRedirect] = useState(false);

  function handleFormSubmission(event){
    event.preventDefault();
    if(user_id){
      createNewPost(user_id, postContent, postImage, data =>{
        if(data.status === 200){
          console.log('main stuff');
          dispatch(createPost(data.post_details))
        }
      })
    }else setRedirect(true)
  }
  if(!toRedirect){
    return (
      <React.Fragment>
        <h1>To Create</h1>
        <form onSubmit ={handleFormSubmission}>
          <textarea name = 'post_content' value  ={postContent} onChange = {event => setPostContent(event.target.value)} placeholder = {`What's going on?? ${user_id? user.firstName : ''}`}/>
          <input name = 'postImage' type='file' accept ='image/*' onChange = {event => setPostImage(event.target.files[0])}/>
          <button type = 'submit'>POST</button>
        </form>
      </React.Fragment>
    )
  }else{
    return <Redirect to ='/login'/>
  }
}

function AllPosts(props) {
  const allPosts = useSelector(store => store.posts)
  return (
    <React.Fragment>
      <h1>Posts</h1>
      { allPosts.map((post, index) => <Post key={index} postDetails={post} />)}
    </React.Fragment>
  )

}

export { AllPosts, CreatePosts }