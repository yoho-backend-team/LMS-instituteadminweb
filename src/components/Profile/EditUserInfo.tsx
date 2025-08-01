// EditUserInfo.tsx
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import profileimg from '../../assets/navbar/Editprofile.png';
import { FONTS } from '../../../src/constants/uiConstants';

interface UserInfo {
    fullName: string;
    userName: string;
    email: string;
    contact: string;
    designation: string;
}

const EditUserInfo: React.FC = () => {
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/profile'); // Replace with your desired route
    };
    const handleSubmits = () => {
        setSuccessMessage('Record submitted successfully!');// Replace with your desired route
    };
    const [userInfo, setUserInfo] = useState<UserInfo>({
        fullName: '',
        userName: '',
        email: '',
        contact: '',
        designation: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(userInfo);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <div className="bg-cyan-500 text-white text-center py-3 rounded-lg" style={{ ...FONTS.heading_04 }}>
                Edit User Informations
            </div>
            <div className="flex flex-col items-center mt-4">
                <img
                    src={profileimg}
                    alt="Profile"
                    className="rounded-full w-24 h-24 object-cover"
                />
                <p className="mt-2 font-semibold text-[#716F6F]" style={{ ...FONTS.heading_09 }}>Chandran R</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 px-4">
                <div>
                    <label className="block font-medium text-[#716F6F]" style={{ ...FONTS.heading_07 }}>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={userInfo.fullName}
                        onChange={handleChange}
                        className="mt-1 w-full border rounded-md p-2 border-t border border-[#A9A7A7]"
                    />
                </div>

                <div>
                    <label className="block font-medium text-[#716F6F]" style={{ ...FONTS.heading_07 }}>User Name</label>
                    <input
                        type="text"
                        name="userName"
                        value={userInfo.userName}
                        onChange={handleChange}
                        className="mt-1 w-full border rounded-md p-2 border-t border border-[#A9A7A7]"
                    />
                </div>

                <div>
                    <label className="block font-medium text-[#716F6F]" style={{ ...FONTS.heading_07 }}>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleChange}
                        className="mt-1 w-full border rounded-md p-2 border-t border border-[#A9A7A7]"
                    />
                </div>

                <div>
                    <label className="block font-medium text-[#716F6F]" style={{ ...FONTS.heading_07 }}>Contact</label>
                    <input
                        type="text"
                        name="contact"
                        value={userInfo.contact}
                        onChange={handleChange}
                        className="mt-1 w-full border rounded-md p-2 border-t border border-[#A9A7A7]"
                    />
                </div>

                <div>
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
                </div>
            </form>

            <div className="flex justify-end gap-4 mt-6 px-4 pb-4">
                <button onClick={handleBack}
                    type="button"
                    className="px-4 py-2 bg-white border border-cyan-500 text-cyan-500 rounded-md hover:bg-cyan-50 " style={{ ...FONTS.heading_07 }}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    onClick={handleSubmits}
                    className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600" style={{ ...FONTS.heading_07 }}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default EditUserInfo;
