// EditUserInfo.tsx
import React, { useState, useRef, type ChangeEvent } from 'react';
import { useLocation, useNavigate } from "react-router-dom"
import profileimg from '../../assets/navbar/Editprofile.png';
import { FONTS } from '../../../src/constants/uiConstants';
import { ArrowLeft } from 'lucide-react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { UpdateProfileThunks } from '../../features/Auth/reducer/thunks';

interface UserInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

const EditUserInfo: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profile = useLocation()?.state;
  const dispatch = useDispatch<AppDispatch>();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      e.target.value = "";
    }
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/profile");
  };

  const [userInfo, setUserInfo] = useState<UserInfo>({
    first_name: profile?.first_name,
    last_name: profile?.last_name,
    email: profile?.email,
    phone_number: profile?.phone_number,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userInfo, "profile data");
    dispatch(UpdateProfileThunks(profile?.uuid, userInfo));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div
        onClick={() => navigate(-1)}
        className=' text-[#1BBFCA] hover:bg-[#1BBFCA]/80 hover:text-white w-fit mb-4'>
        <ArrowLeft size={50} style={{ width: "40px", height: "40px" }} />
      </div>
      <div className="bg-cyan-500 text-white text-center py-3 rounded-lg" style={{ ...FONTS.heading_04 }}>
        Edit User Informations
      </div>
      <div className="flex flex-col items-center mt-4">
        <img
          src={profileimg}
          alt="Profile"
          className="rounded-full w-24 h-24 object-cover"
        />
        {/* <p className="mt-2 font-semibold text-[#716F6F]" style={{ ...FONTS.heading_09 }}>Chandran R</p>*/}

        <span onClick={handleUploadClick} className="text-green-600 font-poppins font-bold text-[12px] mt-2 cursor-pointer">Upload</span>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 px-4"
      >
        <div>
          <label
            className="block font-medium text-[#716F6F]"
            style={{ ...FONTS.heading_07 }}
          >
            Full Name
          </label>
          <input
            type="text"
            name="first_name"
            value={userInfo.first_name}
            onChange={handleChange}
            className="mt-1 w-full rounded-md p-2 border-t border border-[#A9A7A7]"
          />
        </div>

        <div>
          <label
            className="block font-medium text-[#716F6F]"
            style={{ ...FONTS.heading_07 }}
          >
            User Name
          </label>
          <input
            type="text"
            name="last_name"
            value={userInfo.last_name}
            onChange={handleChange}
            className="mt-1 w-full rounded-md p-2 border-t border border-[#A9A7A7]"
          />
        </div>

        <div>
          <label
            className="block font-medium text-[#716F6F]"
            style={{ ...FONTS.heading_07 }}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-md p-2 border-t border border-[#A9A7A7]"
          />
        </div>

        <div>
          <label
            className="block font-medium text-[#716F6F]"
            style={{ ...FONTS.heading_07 }}
          >
            Contact
          </label>
          <input
            type="text"
            name="phone_number"
            value={userInfo.phone_number}
            onChange={handleChange}
            className="mt-1 w-full rounded-md p-2 border-t border border-[#A9A7A7]"
          />
        </div>

        {/* <div>
                    <label className="block text-[#716F6F]" style={{ ...FONTS.heading_07 }}>Designation</label>
                    <select
                        name="designation"
                        value={userInfo.designation}
                        onChange={handleChange}
                        className="mt-1 w-full border-t border border-[#A9A7A7] rounded-md p-2 font-medium text-[#716F6F]"
                    >
                        <option className='font-medium text-[#716F6F]' value="">Select</option>
                        <option className='font-medium text-[#716F6F]' value="Manager">Manager</option>
                        <option className='font-medium text-[#716F6F]' value="Developer">Developer</option>
                        <option className='font-medium text-[#716F6F] ' value="Designer">Designer</option>
                    </select>
                </div> */}

        <div className="flex justify-end gap-4 mt-6 px-4 pb-4 col-span-2">
          <button
            onClick={handleBack}
            type="button"
            className="px-4 py-2 bg-white border border-cyan-500 text-cyan-500 rounded-md hover:bg-cyan-50 "
            style={{ ...FONTS.heading_07 }}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600"
            style={{ ...FONTS.heading_07 }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserInfo;
