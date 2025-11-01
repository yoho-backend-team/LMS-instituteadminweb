import React, { useState, useRef, type ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import profileimg from "../../assets/navbar/Editprofile.png";
import { FONTS } from "../../../src/constants/uiConstants";
import { ArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { UpdateProfileThunks } from "../../features/Auth/reducer/thunks";
import { uploadImageOrFile } from "../../features/Profile_Security/services"; // your upload function
import toast from "react-hot-toast";
import { GetImageUrl } from "../../utils/helper";

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
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<UserInfo>({
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    email: profile?.email || "",
    phone_number: profile?.phone_number || "",
  });

    const [imageUrl, setImageUrl] = useState<string | null>(profile?.image || null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    profile?.image || null
  );
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);

      // Auto upload on selection
      const formData = new FormData();
      formData.append("file", file);

      toast.promise(
        uploadImageOrFile(formData),
        {
          loading: "Uploading...",
          success: (res) => {
            toast.success("Image uploaded successfully!");
            console.log("Upload response:", res);
            setImageUrl(res.data.file)
            setPreviewImage(res.data.file);
            console.log("Uploaded image URL:", res.data.file);
            return "Uploaded!";
          },
          error: () => {
            toast.error("Image upload failed.");
            return "Failed!";
          },
        }
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleBack = () => {
    navigate("/profile");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneRegex = /^\+91\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors: Record<string, string> = {};

    if (!userInfo.first_name?.trim())
      errors.first_name = "First name is required";
    if (!userInfo.last_name?.trim())
      errors.last_name = "Last name is required";
    if (!userInfo.email?.trim())
      errors.email = "Email is required";
    else if (!emailRegex.test(userInfo.email))
      errors.email = "Please enter a valid email";
    if (!userInfo.phone_number?.trim())
      errors.phone_number = "Phone number is required";
    else if (!phoneRegex.test(userInfo.phone_number))
      errors.phone_number = "Phone number must start with +91 and have 10 digits";

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      const formData = new FormData();
      formData.append("first_name", userInfo.first_name);
      formData.append("last_name", userInfo.last_name);
      formData.append("email", userInfo.email);
      formData.append("phone_number", userInfo.phone_number);

      if (imageUrl) {
        formData.append("image", imageUrl);
      }

      await dispatch(UpdateProfileThunks(profile?.uuid, formData));
      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Profile update failed!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div
        onClick={() => navigate(-1)}
        className="text-[#1BBFCA] hover:bg-[#1BBFCA]/80 hover:text-white w-fit mb-4"
      >
        <ArrowLeft size={50} />
      </div>

      <div
        className="bg-cyan-500 text-white text-center py-3 rounded-lg"
        style={{ ...FONTS.heading_04 }}
      >
        Edit User Informations
      </div>

      <div className="flex flex-col items-center mt-4">
        <img
          src={GetImageUrl(previewImage) ?? undefined}
          alt="Profile"
          className="rounded-full w-24 h-24 object-cover"
        />

        <span
          onClick={handleUploadClick}
          className="text-green-600 font-poppins font-bold text-[12px] mt-2 cursor-pointer"
        >
          Upload
        </span>
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
          <label className="block font-medium text-[#716F6F]">
            Full Name
          </label>
          <input
            type="text"
            name="first_name"
            value={userInfo.first_name}
            onChange={handleChange}
            className="mt-1 w-full rounded-md p-2 border border-[#A9A7A7]"
          />
          {formErrors.first_name && (
            <p className="text-red-500 text-sm">{formErrors.first_name}</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-[#716F6F]">
            User Name
          </label>
          <input
            type="text"
            name="last_name"
            value={userInfo.last_name}
            onChange={handleChange}
            className="mt-1 w-full rounded-md p-2 border border-[#A9A7A7]"
          />
          {formErrors.last_name && (
            <p className="text-red-500 text-sm">{formErrors.last_name}</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-[#716F6F]">Email</label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-md p-2 border border-[#A9A7A7]"
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm">{formErrors.email}</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-[#716F6F]">Contact</label>
          <input
            type="text"
            name="phone_number"
            value={userInfo.phone_number}
            onChange={handleChange}
            className="mt-1 w-full rounded-md p-2 border border-[#A9A7A7]"
            placeholder="eg: +91xxxxxxxxxx"
            pattern="^\+91\d{10}$"
          />
          {formErrors.phone_number && (
            <p className="text-red-500 text-sm">{formErrors.phone_number}</p>
          )}
        </div>

        <div className="flex justify-end gap-4 mt-6 px-4 pb-4 col-span-2">
          <button
            onClick={handleBack}
            type="button"
            className="px-4 py-2 bg-white border border-cyan-500 text-cyan-500 rounded-md hover:bg-cyan-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserInfo;
