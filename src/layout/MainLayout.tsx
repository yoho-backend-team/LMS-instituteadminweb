/* eslint-disable @typescript-eslint/no-explicit-any */

import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/shared/Navbar';
import SideBar from '../components/shared/SideBar';
import Client from '../apis/index'

export const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarWidth = isSidebarOpen ? 250 : 87;

  const publicVapidKey = import.meta.env.VITE_PUBLIC_VAPI_KEY;

  function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String?.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window?.atob(base64);
    return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/Service-Worker.js')
      .then((registration) => {
        console.log(
          'Service Worker registered with scope:',
          registration.scope
        );
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }

  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker
      .register('/Service-Worker.js')
      .then(async (register: any) => {
        const user: any = localStorage.getItem('user');
        const sub = await register.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
        });

        await Client.notificatinsubscription.post({
          subscription: sub,
          user: user._id,
        });
      });
  }

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden bg-[#1BBFCA]">
      <div className="flex flex-col flex-1">
        <Navbar />
      </div>
      <div className="flex h-screen overflow-hidden">

        <div
          className="transition-all duration-300	"
          style={{ width: `${sidebarWidth}px` }}
        >
          <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </div>
        <div className="flex-1 overflow-y-auto p-6 bg-white rounded-tl-[35px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
