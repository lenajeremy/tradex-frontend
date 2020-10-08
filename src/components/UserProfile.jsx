import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { profileChange } from '../actions';
import { motion } from 'framer-motion';
import {editUser} from '../fetch';
// import './UserProfile.css';

function ProfileImage({ image, userName }) {
  return (
    <div className="profile__image img-responsive img-fluid">
      <img src={`${image}`} alt={userName} />
    </div>
  )
}

function UserProfile(props) {
  const user = useSelector(store => store.userDetails)
  const editProfileUrl = (url) => `http://localhost:8000/${url}`;

  if (user.id) {
    return (
      <div className='userProfile'>
        <div className="profile">
          <div className="top">
            <ProfileImage userName={user.userName} image={editProfileUrl('media/'+user.profilePicture)} />
            <div className="details">
              <h4><span role='img' aria-labelledby='img'>🛑</span>{user.userName}</h4>
              <p className='lead'>{user.profile.status}</p>
            </div>
          </div>
          <p>{user.profile.bio}</p>
        </div>
        <EditProfile userDetails={user} />
      </div>
    )
  } else return <Redirect to='/login' />
}

function EditProfile(props) {

  const dispatch = useDispatch();
  const [newbio, setNewBio] = useState(props.userDetails.profile.bio);
  const [newstatus, setNewStatus] = useState(props.userDetails.profile.status);
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState(false);

  function handleFormSubmission(event) {
    event.preventDefault();
    if(newbio && newstatus){
      editUser(props.userDetails.id, newstatus, newbio, profileImage, data => {
        if (data.status === 200) {
          dispatch(profileChange({ bio: newbio, status: newstatus }))
        } else setErrors(true)
      })
    }
  }
  return (
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2 }}>
      <form onSubmit={handleFormSubmission}>
        {errors ? <p>Error! Your profile could not be edited</p> : ''}
        <input type='text' value={newstatus} placeholder='Edit your status' onChange={event => setNewStatus(event.target.value)} />
        <textarea value={newbio} placeholder='What you want the public to know about you?' onChange={e => setNewBio(e.target.value)} />
        <input type='file' accept='image/*' className='form-control' onChange={e => setProfileImage(e.target.files[0])} />
        <input type='submit' className='btn btn-primary btn-block' value='Update Profile' />
      </form>
    </motion.div>
  )

}
// window.open(`https://twitter.com/intent/tweet?text=Thank%20you%20@theabbiee%20for%20writing%20this%20helpful%20article%2e%0A%0AEverything%20You%20Need%20to%20Know%20About%20Cookies%20for%20Web%20Development%0A%0Ahttps%3A%2F%2Fwww.freecodecamp.org%2Fnews%2Feverything-you-need-to-know-about-cookies%2F`, 'share-twitter', 'width=550, height=235'); return false;
export default UserProfile;