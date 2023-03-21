import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../action/adminLoginAction';
import './AdminHeader.css'
const AdminHeader = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      console.log("logged out")
      dispatch(logout());
      navigate("/adminlogin");
    }
  };

  return (
    <div className='admin-header'>
      <div className='user-name'>
        <p>Admin</p>
      </div>
      <div className='user-image'>
        <p style={{cursor: 'pointer'}} onClick={logoutHandler}>Logout</p>
      </div>
    </div>
  )
}

export default AdminHeader
