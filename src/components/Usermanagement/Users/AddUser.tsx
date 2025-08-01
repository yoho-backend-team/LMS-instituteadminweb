import React from 'react';
import { MdCancel } from "react-icons/md";
import Profile from "../../../assets/profileicon.png"

export default function AddUser({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed "
        onClick={onClose}
      />

      {/* Slide-in Drawer */}
      <div className="relative w-full  max-w-md h-140 shadow-xl p-6 animate-slideInLeft rounded-2xl overflow-y-auto mt-6 bg-white backdrop-blur-md">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl text-[#716F6F] font-semibold">Add User</p>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-2xl">
            <MdCancel />
          </button>
        </div>
                <div> <div className='flex justify-center'><img src={Profile} alt="" /></div> 
                <p className='text-green-500 flex justify-center'>upload</p></div>
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-md text-[#716F6F] mb-1">Branch</label>
            <input
              type="text"
              className="w-full border border-[#716F6F] px-3 py-2 rounded"
              
            />
          </div>

          <div>
            <label className="block text-md text-[#716F6F] mb-1">First Name</label>
            <input
              type="text"
              className="w-full border border-[#716F6F] px-3 py-2 rounded"
             
            />
          </div>

          <div>
            <label className="block text-md text-[#716F6F] mb-1">Last Name</label>
            <input
              type="text"
              className="w-full border border-[#716F6F] px-3 py-2 rounded"
             
            />
          </div>

          <div>
            <label className="block text-md text-[#716F6F] mb-1">Email</label>
            <input
              type="text"
              className="w-full border border-[#716F6F] px-3 py-2 rounded"
             
            />
          </div>
           <div>
            <label className="block text-md text-[#716F6F] mb-1">Contact</label>
            <input
              type="text"
              className="w-full border border-[#716F6F] px-3 py-2 rounded"
           
            />
          </div>
             <div>
            <label className="block text-md text-[#716F6F] mb-1">Designation</label>
            <input
              type="text"
              className="w-full border border-[#716F6F] px-3 py-2 rounded"
             
            />
          </div>
           <div>
            <label className="block text-md text-[#716F6F] mb-1">Select Role</label>
            <input
              type="text"
              className="w-full border border-[#716F6F] px-3 py-2 rounded"
             
            />
          </div>
           <div>
            <label className="block text-md text-[#716F6F] mb-1">User Name</label>
            <input
              type="text"
              className="w-full border border-[#716F6F] px-3 py-2 rounded"
            
            />
          </div>
           <div>
            <label className="block text-md text-[#716F6F] mb-1">Password</label>
            <input
              type="text"
              className="w-full border border-[#716F6F] px-3 py-2 rounded"
             
            />
          </div>
           <div>
            <label className="block text-md text-[#716F6F] mb-1">Confirm Password</label>
            <input
              type="text"
              className="w-full border border-[#716F6F] px-3 py-2 rounded"
              
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="mr-3 border bg-[#1BBFCA1A] border-[#1BBFCA] text-[#1BBFCA] px-4 py-2 rounded-lg hover:bg-[#f0f0f0]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#1BBFCA] text-white px-4 py-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
