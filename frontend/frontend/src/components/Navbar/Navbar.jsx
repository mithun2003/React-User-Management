import { Avatar } from "@mui/material";
import React, { useEffect} from "react";
import "./Navbar.css";

import {  useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../../action/authAction";
import { fetchUser } from "../../action/userAction";
import { logout } from "../../action/loginAction";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state=>state.login.user)
  const users = useSelector((state) => state.users);
  const loginState = useSelector(state => state.login)
  const logoutHandler = (e) => {
    console.log(e)
    localStorage.removeItem('authToken')
    dispatch(clearAuth())
    dispatch(logout())
    // navigate('/login')
  }

  
  useEffect(() => {
    console.log(user)
    dispatch(fetchUser(user.id));
  }, [user]);


  return (
    <div className="header">
      <div className="user-name">
        <p style={{ cursor: "pointer" }}>
          Users
        </p>
      </div>
      <div className="user-image">
        <p>Hi,{users.name}</p>
        <p style={{cursor: 'pointer'}} onClick={logoutHandler}>Logout</p>

        <Avatar alt="Profile picture" src={users.image} />
      </div>
    </div>
  );
}

export default Navbar;
