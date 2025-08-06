import { useEffect, useState } from "react"
import { COLORS, FONTS } from "../../../../constants/uiConstants"
import EditDetails from "./EditDetails"
import { getUserById } from "../service";
import { useNavigate, useParams } from "react-router-dom";
import { GetImageUrl } from "../../../../utils/helper";
import back from "../../../../assets/arrow-left.png"
import { IoIosArrowBack } from "react-icons/io";

interface UserDetail {
  image?: string;
  first_name?: string;
  last_name?: string;
  role?: {
    identity?: string;
  };
  is_active?: boolean;
  username?: string;
  email?: string;
  designation?: string;
  phone_number?: string;
  contact_info?: {
    city?: string;
  };
}


const UsersDetails = () => {
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const [userDetail, setUserDetail] = useState<UserDetail>();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await getUserById({id})
                console.log("Responsess", response)
                setUserDetail(response?.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUserProfile();
    },[id])

    const handleBack = () => {
        navigate("/users")
    }

    return (
        <div>
            <div className="pb-4">
                <button onClick={handleBack} className="w-[30px] h-[30px] shadow-[0_0_20px_rgba(0,0,0,0.2)] bg-white rounded-lg flex items-center justify-center"><IoIosArrowBack className="w-[25px] h-[35px]"/></button>
            </div>
        <div className="p-4 border rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.2)] bg-white">
            <div className="flex justify-between p-2 pb-8 border-b">
                <div className={`flex gap-8`}>
                    <img src={GetImageUrl(userDetail?.image) ?? ""} className="w-[60px] h-[60px] rounded-full" alt="profile"></img>
                    <div>
                        <h1 className={`text-[${COLORS.gray_dark_02}]`} style={{ ...FONTS.heading_04_bold }}>{userDetail?.first_name + " " + userDetail?.last_name}</h1>
                        <p className={`text-[${COLORS.gray_dark_02}]`} style={{ ...FONTS.heading_07 }}>{userDetail?.role?.identity}</p>
                    </div>
                </div>
                <div className={`bg-[${COLORS.light_green}] w-[55px] h-[25px]  flex justify-center items-center rounded-md`} style={{...FONTS.heading_13}}><span className="text-white">{userDetail?.is_active ? "Active" : "Inactive"}</span></div>
            </div>
            <div className="p-2 mt-10 grid gap-4">
                <h1 className={`text-[${COLORS.gray_dark_02}]`} style={{ ...FONTS.heading_05_bold }}>Profile Details</h1>
                <div className="grid grid-cols-3 p-5 gap-8">
                    <div className="">
                        <label className={`text-[${COLORS.gray_light}]`} style={{ ...FONTS.heading_12 }}>User Name</label>
                        <p className={`text-[${COLORS.gray_dark_02}]`} style={{ ...FONTS.heading_06_bold }}>{userDetail?.username}</p>
                    </div>
                    <div className="">
                        <label className={`text-[${COLORS.gray_light}]`} style={{ ...FONTS.heading_12 }}>Email</label>
                        <p className={`text-[${COLORS.gray_dark_02}]`} style={{ ...FONTS.heading_06_bold }}>{userDetail?.email}</p>
                    </div>
                    <div className="">
                        <label className={`text-[${COLORS.gray_light}]`} style={{ ...FONTS.heading_12 }}>Designation</label>
                        <p className={`text-[${COLORS.gray_dark_02}]`} style={{ ...FONTS.heading_06_bold }}>{userDetail?.designation}</p>
                    </div>
                    <div className="">
                        <label className={`text-[${COLORS.gray_light}]`} style={{ ...FONTS.heading_12 }}>Phone</label>
                        <p className={`text-[${COLORS.gray_dark_02}]`} style={{ ...FONTS.heading_06_bold }}>{userDetail?.phone_number}</p>
                    </div>
                    <div className="">
                        <label className={`text-[${COLORS.gray_light}]`} style={{ ...FONTS.heading_12 }}>Location</label>
                        <p className={`text-[${COLORS.gray_dark_02}]`} style={{ ...FONTS.heading_06_bold }}>{userDetail?.contact_info?.city || "--"}</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end" style={{...FONTS.heading_07}}>
                <button onClick={() => setShowEditModal(true)} className={`bg-[${COLORS.light_green}] text-white w-[112px] h-[40px] flex justify-center items-center rounded-lg`}>Edit Details</button>
            </div>
            {showEditModal && <div className="fixed inset-0 backdrop-blur-sm bg-black/30 "><div className="fixed top-0 right-110"><EditDetails setShowEditModal={setShowEditModal} userDetail={userDetail}/></div></div>}
        </div>
        </div>
    )
}

export default UsersDetails