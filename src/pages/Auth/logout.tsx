// src/components/Auth/LogoutRoute.tsx
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { AuthThunks } from '../../features/Auth/reducer/thunks';
import { useAuth } from '../Auth/AuthContext';
import login from '../Auth/Login/LoginPage';
import LoginPage from '../Auth/Login/LoginPage';

export default function LogoutRoute() {
  const { logout } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Clear local storage data
    localStorage.removeItem('token');
    localStorage.removeItem('OtpToken');
    localStorage.removeItem('otp');
    localStorage.removeItem('email');

    // 2. Reset global auth state via Redux + Context
    dispatch(AuthThunks.logOutUser?.());
    logout();

    // 3. Show a success toast **before** navigating ∙ ensures toast renders reliably :contentReference[oaicite:2]{index=2}
    toast.success('Logged out successfully');

    // 4. Navigate to login page
    navigate('/login', { replace: true });
  }, [dispatch, logout, navigate]);

  // We don’t render anything ourselves because we’re doing navigation programmatically
  return null;
  <div><LoginPage /></div>
}
