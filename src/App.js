/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import { Route, Link } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import WrapperFunction from "./components/CreateAndViewPosts";
import Sidebar from "./components/SideBar";

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <div className="container">
        <Route
          path="/"
          exact
          component={WrapperFunction}
        />
        <Route path="/user/profile" component={UserProfile} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    </div>
  );
}

export default App;
