import { combineReducers } from "redux";
import postReducer from "./posts.reducer";
import profileReducer from "./profile.reducer";
import userReducer from './user.reducer';
import sideBarReducer from './sidebar.reducer'

const rootReducer = combineReducers({
  posts: postReducer,
  userProfile: profileReducer,
  userDetails: userReducer,
  sideBar: sideBarReducer
});

export default rootReducer;
