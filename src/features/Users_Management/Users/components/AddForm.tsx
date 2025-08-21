import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Input } from "../../../../components/ui/input";
import { COLORS, FONTS } from "../../../../constants/uiConstants";
import upload from "../../../../assets/cloud.png";
import close from "../../../../assets/Cancel.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ChevronDownIcon } from "lucide-react";
import { addUser } from "../service";
import Client from "../../../../apis/index";
import { getInstituteDetails } from "../../../../apis/httpEndpoints";
import { GetImageUrl } from "../../../../utils/helper";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllBranches } from "../../../Class Management/Live Class/services";
interface Group {
  _id: string;
  identity: string;
  [key: string]: any;
}

interface UserDetail {
  first_name?: string;
  last_name?: string;
  email?: string;
  username?: string;
  designation?: string;
  role?: {
    identity?: string;
    [key: string]: any;
  };
  phone_number?: string;
  image?: string;
  uuid?: string;
  [key: string]: any;
}

type Props = {
  setShowForm: (show: boolean) => void;
    userDetail: UserDetail | null;
};

const AddForm: React.FC<Props> = ({ setShowForm,userDetail }) => {
  const [imgSrc, setImgSrc] = useState<string>("");
  const [allBranches, setAllBranches] = useState<any[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      contact: "",
      password: "",
      confirm_password: "",
      designation: "",
      branch: "",
      role: "",
      file: null,
      institute_id: "",
      user_name: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .required("First name is required")
        .min(3, "Minimum 3 characters to first_name"),
      last_name: Yup.string().required("Last name is required"),
      user_name: Yup.string().required("User name is required"),
      email: Yup.string()
        .required("Email is required")
        .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email Format"),
      contact: Yup.string()
        .min(10, "Phone number must be a 10 digit")
        .required("Phone number is required")
        .matches(/^[6-9]\d{9}$/, "Invalid Phone Number"),
      branch: Yup.string().required("Select a branch"),
      role: Yup.string().required("Select a role"),
      password: Yup.string()
        .min(6, "Password is minimum 6 characters")
        .required("Password is required"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
      file: Yup.mixed()
        .required("Profile image is required")
        .test("fileType", "Unsupported file format", (value: any) => {
          return (
            value &&
            ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
          );
        }),
      designation: Yup.string().required("Designation is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      const institute_id =
        getInstituteDetails() ?? "973195c0-66ed-47c2-b098-d8989d3e4529";

      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
      formData.append("email", values.email);
      formData.append("phone_number", "+91" + values.contact);
      formData.append("branch", "67f3a26ef4b2c530acd16425");
      formData.append("role", values.role);
      formData.append("password", values.password);
      formData.append("confirm_password", values.confirm_password);
      formData.append("designation", values.designation);
      formData.append("username", values.user_name);
      formData.append("institute_id", institute_id);

      if (values.file) {
        formData.append("image", values.file);
      }

      try {
        const response = await addUser(formData);
        console.log("Submitted FormData", [...formData.entries()]);
        setShowForm(false);
      } catch (err) {
        console.error("Submission error:", err);
      }
    },
  });

  const handleImageChange = async (e: any) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      const file = e.currentTarget.files[0];
      formik.setFieldValue("file", file);

      const data = new FormData();
      data.append("file", file);

      try {
        const upload = await Client.file.upload(data);
        setImgSrc(upload?.data?.file);
      } catch (err) {
        console.error("File upload failed", err);
      }
    }
  };

  const fetchAllBranches = useCallback(async () => {
    try {
      const response = await getAllBranches({});
      if (response?.data) {
        setAllBranches(response.data);
      }
    } catch (error) {
      console.error("Error fetching branches:", error);
      toast.error("Failed to load branches");
    }
  }, []);

  useEffect(() => {
    fetchAllBranches();
  }, [fetchAllBranches]);

  return (
    <div className={`p-4`}>
      <div className="flex justify-between pb-5 pt-2">
        <h1
          className={`text-[${COLORS.gray_dark_02}]`}
          style={{ ...FONTS.heading_04_bold }}
        >
          Add User
        </h1>
        <button
          onClick={() => setShowForm(false)}
          className="text-gray-500 font-bold text-lg"
        >
          <img src={close}></img>
        </button>
      </div>

      <form onSubmit={formik.handleSubmit} className="grid gap-4">
        <div className=" p-1  grid justify-center ml-15">
          {formik.values.file && typeof formik.values.file !== "string" && (
            <img
              className={`w-[100px] h-[100px] ml-8`}
              src={imgSrc ? GetImageUrl(imgSrc) : upload}
              alt="Preview"
            ></img>
          )}
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            onBlur={formik.handleBlur}
            className="border-none text-left"
          />
        </div>

<div className="grid gap-1">
  <label
    htmlFor="branch"
    className={`text-[${COLORS.gray_dark_02}]`}
    style={{ ...FONTS.heading_08_bold }}
  >
    Branch
  </label>

  <Select
    onValueChange={(val) => {
      formik.setFieldValue("branch", val);
      formik.setFieldTouched("branch", true);
    }}
    defaultValue={formik.values.branch || ""}
  >
    <SelectTrigger
      style={{ height: "45px" }}
      className={`w-full border rounded-[8px] border-[#716F6F] pr-[16px] pl-[16px] text-[${COLORS.gray_dark_02}]`}
    >
      <SelectValue placeholder="Select branch" />
      <ChevronDownIcon className="size-4 opacity-50 text-[#716F6F]" />
    </SelectTrigger>

    <SelectContent className="bg-white">
      {allBranches && allBranches.length > 0 ? (
        allBranches.map((branch) => (
          <SelectItem
            key={branch._id}
            value={branch._id}
            className={`hover:bg-[${COLORS.primary}] p-2 my-1.5 rounded-[8px] cursor-pointer`}
            style={{ ...FONTS.heading_08 }}
          >
            {branch.branch_identity}
          </SelectItem>
        ))
      ) : (
        <SelectItem
          value="no-options"
          disabled
          className="p-2 my-1.5 rounded-[8px] text-gray-400 cursor-not-allowed"
          style={{ ...FONTS.heading_08 }}
        >
          No branches
        </SelectItem>
      )}
    </SelectContent>
  </Select>

  {formik.touched.branch && formik.errors.branch && (
    <p className="text-red-400" style={{ ...FONTS.heading_12 }}>
      {formik.errors.branch}
    </p>
  )}
</div>

        <div className="grid gap-1">
          <label
            className={`text-[${COLORS.gray_dark_02}]`}
            style={{ ...FONTS.heading_08_bold }}
          >
            First Name
          </label>
          <Input
            name="first_name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            minLength={3}
            placeholder="Enter your first name"
            className={`w-full  h-[45px] border border-[#716F6F] rounded-[8px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] hover:border-[${COLORS.primary}] focus:border-[${COLORS.primary}] focus: outline-none`}
          ></Input>
          {formik.touched.first_name && formik.errors.first_name && (
            <p className={`text-red-400`} style={{ ...FONTS.heading_12 }}>
              {formik.errors.first_name}
            </p>
          )}
        </div>

        <div className="grid gap-1">
          <label
            className={`text-[${COLORS.gray_dark_02}]`}
            style={{ ...FONTS.heading_08_bold }}
          >
            Last Name
          </label>
          <Input
            name="last_name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your last name"
            className={`w-full  h-[45px] border border-[#716F6F] rounded-[8px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] hover:border-[${COLORS.primary}] focus:border-[${COLORS.primary}] focus: outline-none`}
          ></Input>
          {formik.touched.last_name && formik.errors.last_name && (
            <p className={`text-red-400`} style={{ ...FONTS.heading_12 }}>
              {formik.errors.last_name}
            </p>
          )}
        </div>

        <div className="grid gap-1">
          <label
            className={`text-[${COLORS.gray_dark_02}]`}
            style={{ ...FONTS.heading_08_bold }}
          >
            Username
          </label>
          <Input
            name="user_name"
            value={formik.values.user_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your email"
            className={`w-full  h-[45px] border border-[#716F6F] rounded-[8px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] hover:border-[${COLORS.primary}] focus:border-[${COLORS.primary}] focus: outline-none`}
          ></Input>
          {formik.touched.user_name && formik.errors.user_name && (
            <p className={`text-red-400`} style={{ ...FONTS.heading_12 }}>
              {formik.errors.user_name}
            </p>
          )}
        </div>

        <div className="grid gap-1">
          <label
            className={`text-[${COLORS.gray_dark_02}]`}
            style={{ ...FONTS.heading_08_bold }}
          >
            Email
          </label>
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your email"
            className={`w-full  h-[45px] border border-[#716F6F] rounded-[8px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] hover:border-[${COLORS.primary}] focus:border-[${COLORS.primary}] focus: outline-none`}
          ></Input>
          {formik.touched.email && formik.errors.email && (
            <p className={`text-red-400`} style={{ ...FONTS.heading_12 }}>
              {formik.errors.email}
            </p>
          )}
        </div>

        <div className="grid gap-1">
          <label
            className={`text-[${COLORS.gray_dark_02}]`}
            style={{ ...FONTS.heading_08_bold }}
          >
            Designation
          </label>
          <Input
            name="designation"
            value={formik.values.designation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your designation"
            className={`w-full  h-[45px] border border-[#716F6F] rounded-[8px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] hover:border-[${COLORS.primary}] focus:border-[${COLORS.primary}] focus: outline-none`}
          ></Input>
          {formik.touched.designation && formik.errors.designation && (
            <p className={`text-red-400`} style={{ ...FONTS.heading_12 }}>
              {formik.errors.designation}
            </p>
          )}
        </div>

        <div className="grid gap-1">
          <label
            className={`text-[${COLORS.gray_dark_02}]`}
            style={{ ...FONTS.heading_08_bold }}
          >
            Contact
          </label>
          <Input
            name="contact"
            value={formik.values.contact}
            // maxLength={10}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your contact number"
            className={`w-full  h-[45px] border border-[#716F6F] rounded-[8px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] hover:border-[${COLORS.primary}] focus:border-[${COLORS.primary}] focus: outline-none`}
          ></Input>
          {formik.touched.contact && formik.errors.contact && (
            <p className={`text-red-400`} style={{ ...FONTS.heading_12 }}>
              {formik.errors.contact}
            </p>
          )}
        </div>

 <div className="grid gap-1">
  <label
    htmlFor="role"
    style={{ ...FONTS.heading_08_bold, color: COLORS.gray_dark_02 }}
  >
    Role
  </label>

  <Select
    onValueChange={(val) => {
      formik.setFieldValue("role", val);
      formik.setFieldTouched("role", true);
    }}
    defaultValue={formik.values.role || userDetail?.role?._id || ""}
  >
    <SelectTrigger
      style={{ height: "45px", color: COLORS.gray_dark_02 }}
      className="w-full border rounded-[8px] border-[#716F6F] pr-[16px] pl-[16px]"
    >
      <SelectValue placeholder="Select role" />
      <ChevronDownIcon className="size-4 opacity-50 text-[#716F6F]" />
    </SelectTrigger>

    <SelectContent className="bg-white">
      {groups && groups.length > 0 ? (
        groups.map((group) => (
          <SelectItem
            key={group._id}
            value={group._id}
            className="p-2 my-1.5 rounded-[8px] cursor-pointer"
            style={{
              ...FONTS.heading_08,
              color: COLORS.gray_dark_02,
            }}
          >
            {group.identity}
          </SelectItem>
        ))
      ) : (
        <SelectItem
          value="no-options"
          disabled
          className="p-2 my-1.5 rounded-[8px] text-gray-400 cursor-not-allowed"
          style={{ ...FONTS.heading_08 }}
        >
          No roles
        </SelectItem>
      )}
    </SelectContent>
  </Select>

  {formik.touched.role && formik.errors.role && (
    <p className="text-red-400" style={{ ...FONTS.heading_12 }}>
      {formik.errors.role}
    </p>
  )}
</div>

        <div className="grid gap-1">
          <label
            className={`text-[${COLORS.gray_dark_02}]`}
            style={{ ...FONTS.heading_08_bold }}
          >
            Password
          </label>
          <Input
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="Enter your password"
            className={`w-full  h-[45px] border border-[#716F6F] rounded-[8px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] hover:border-[${COLORS.primary}] focus:border-[${COLORS.primary}] focus: outline-none`}
          ></Input>
          {formik.touched.password && formik.errors.password && (
            <p className={`text-red-400`} style={{ ...FONTS.heading_12 }}>
              {formik.errors.password}
            </p>
          )}
        </div>

        <div className="grid gap-1">
          <label
            className={`text-[${COLORS.gray_dark_02}]`}
            style={{ ...FONTS.heading_08_bold }}
          >
            Confirm Password
          </label>
          <Input
            name="confirm_password"
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your confirm password"
            className={`w-full  h-[45px] border border-[#716F6F] rounded-[8px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] hover:border-[${COLORS.primary}] focus:border-[${COLORS.primary}] focus: outline-none`}
          ></Input>
          {formik.touched.confirm_password &&
            formik.errors.confirm_password && (
              <p className={`text-red-400`} style={{ ...FONTS.heading_12 }}>
                {formik.errors.confirm_password}
              </p>
            )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowForm(false)}
            style={{ ...FONTS.heading_08_bold }}
            className={`bg-[#D7F6F5] border border-[#1BBFCA] pr-[16px] pl-[16px] h-[40px] rounded-[8px] flex items-center gap-2 text-[#1BBFCA]`}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{ ...FONTS.heading_08_bold }}
            className="bg-[#1BBFCA] pr-[16px] pl-[16px] h-[40px] rounded-[8px] flex items-center gap-2 text-[#FFFFFF]"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
