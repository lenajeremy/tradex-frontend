import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link} from 'react-router-dom';
import { editSidebar } from '../actions';
import './styles/Sidebar.css';


function Sidebar(props) {
  const dispatch = useDispatch();
  const userDetails = useSelector(store => store.userDetails);

  const active = useSelector(store => store.sideBar)

  function userTypeDeterminant() {
    if (userDetails.userType === 'buyer') {
      return (
        <div className={`sideBar__links right ${active === 'cart' ? 'active' : ''}`}>
            <div className='top'></div>
            <div className='bottom'></div>
          <Link onClick = {() => dispatch(editSidebar({ value: 'cart' }))} to='/user/cart'>Your Cart</Link>
        </div>
      )
    } else return (
    <div className={`sideBar__links right ${active === 'store' ? 'active' : ''}`}>
        <div className='top'></div>
        <div className='bottom'></div>
      <Link onClick = {() => dispatch(editSidebar({ value: 'store' }))} to='/user/store'>Your Store</Link>
    </div>)
  }
  return (
    <div className='sideBar'>
      <div className='links'>
        <div className={`sideBar__links left ${active === 'explore' ? 'active' : ''}`}>
            <div className='top'></div>
            <div className='bottom'></div>
          <Link onClick = {() => dispatch(editSidebar({ value: 'explore' }))} to='/'>Explore</Link>
        </div>
        <div className={`sideBar__links right ${active === 'profile' ? 'active' : ''}`}>
            <div className='top'></div>
            <div className='bottom'></div> 
          <Link onClick = {() => dispatch(editSidebar({ value: 'profile' }))} to='/user/profile'>Your Profile</Link>
        </div>
        <div className={`sideBar__links left ${active === 'account' ? 'active' : ''}`}>
            <div className='top'></div>
            <div className='bottom'></div> 
          <Link onClick = {() => dispatch(editSidebar({ value: 'account' }))} to='/user/account'>Your Account</Link>
        </div>
        {userTypeDeterminant()}
        <div className={`sideBar__links right ${active === 'advertise' ? 'active' : ''}`}>
            <div className='top'></div>
            <div className='bottom'></div>
          <Link onClick = {() => dispatch(editSidebar({ value: 'advertise' }))} to='/core/ads'>Advertise on TradeX</Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar