import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import { Route, Link } from "react-router-dom";
import { getAllPosts } from "./fetch";
import { useSelector, useDispatch } from "react-redux";
import { fetchposts } from "./actions";
import UserProfile from "./components/UserProfile";
import { AllPosts, CreatePosts } from "./components/CreateAndViewPosts";
import Sidebar from './components/SideBar';

function App() {
  // posts from redux store
  let posts = useSelector((store) => store.posts);
  let userDetails = useSelector((store) => store.userDetails);
  const [toLoad, setLoad] = useState(false);

  let dispatch = useDispatch();
  function updatePosts() {
    console.log('updatePosts');
    getAllPosts(lastPost, (data) => {
      if (data.posts.length !== 0) {
        dispatch(fetchposts(data.posts));
        setlastPost(posts.length === 0 ? 2 : posts[posts.length - 1].id + 1);
      }
    });
  }
  function loadListener(){
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight){
      setLoad(true);
      updatePosts();
    }
  }
  useEffect(() => {
    updatePosts();
    window.addEventListener('scroll', loadListener);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if(toLoad)  {
      window.removeEventListener('scroll', loadListener);
      console.log('the event listener has been removed');
      updatePosts();
      setLoad(false);
    }
  }, [toLoad])


  // state of the id of latest post
  const [lastPost, setlastPost] = useState(1);

  return (
    <div className="App">
      <Header />
      <Sidebar />
      <div className="container">
        <Route
          path="/"
          exact
          component={() => (
            <React.Fragment>
              <h1>Hello {userDetails.userName || "guest"}</h1>
              <Link to="/user/profile">Profile</Link>
              <CreatePosts />
              <AllPosts />
            </React.Fragment>
          )}
        />
        <Route path="/user/profile" component={UserProfile} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    </div>
  );
}

export default App;
