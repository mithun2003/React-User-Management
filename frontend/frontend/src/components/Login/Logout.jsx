import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import { clearAuth } from "../../action/authAction";
import { useDispatch } from 'react-redux';

export default function Logout() {
	const navigate = useNavigate();
    const dispatch = useDispatch()
	useEffect(() => {
		// const response = axios.post('api/users/logout/blacklist/', {
		// 	refresh_token: localStorage.getItem('authToken'),
		// });
		localStorage.removeItem('authToken');
		dispatch(clearAuth());
		// axios.defaults.headers['Authorization'] = null;
		navigate('/login');
	},[]);
	return <div>Logout</div>;
}