import { ChevronDownIcon } from "lucide-react";
import { Input } from "../../../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";
import { COLORS, FONTS } from "../../../../constants/uiConstants"
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { GetImageUrl } from "../../../../utils/helper";
import { GetAllGroupCard } from "../../Group/reducers/service";
import { getInstituteDetails, getSelectedBranchId } from "../../../../apis/httpEndpoints";
import { updateUser } from "../service";

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

interface EditDetailsProps {
  setShowEditModal: (show: boolean) => void;
  userDetail: UserDetail | null;
}

const EditDetails: React.FC<EditDetailsProps> = ({ setShowEditModal, userDetail }) => {
    const [groups, setGroups] = useState<Group[]>([]);

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const instituteId = getInstituteDetails() ?? '973195c0-66ed-47c2-b098-d8989d3e4529';
            const branchId = getSelectedBranchId() ?? '90c93163-01cf-4f80-b88b-4bc5a5dd8ee4';
            const response = await GetAllGroupCard({ branch_id: branchId, institute_id: instituteId });
            setGroups(response?.data || []);
        } catch (error) {
            console.error("Error fetching groups:", error);
        }
    }

    const initialValues = {
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        designation: "",
        role: "",
        phone_number: "",
        image: "",
        userId: ""
    }

    const { 
        register, 
        setValue, 
        handleSubmit, 
        reset, 
        formState: { errors } 
    } = useForm<typeof initialValues>();

    useEffect(() => {
        if (userDetail) {
            reset({
                first_name: userDetail?.first_name || "",
                last_name: userDetail?.last_name || "",
                email: userDetail?.email || "",
                username: userDetail?.username || "",
                phone_number: userDetail?.phone_number || "",
                role: userDetail?.role?.identity || "",
                designation: userDetail?.designation || "",
                image: userDetail?.image || "",
                userId: userDetail?.uuid || ""
            });
        }
    }, [userDetail, reset]);

    const onSubmit = async (data: typeof initialValues) => {
        try {
            await updateUser(data);
            setShowEditModal(false);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    }

    return (
        <div className="w-[782px] bg-white rounded-lg border p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={`border bg-[${COLORS.primary}] h-[48px] rounded-xl text-white flex items-center justify-center`}>
                    <h1 style={{ ...FONTS.heading_05_bold }}>Edit user Information</h1>
                </div>
                
                <div className='p-9 grid justify-center'>
                    <img 
                        src={userDetail?.image ? GetImageUrl(userDetail.image) : ''} 
                        className={`w-[100px] h-[100px] border rounded-full mx-auto`} 
                        alt='Preview'
                    />
                    <input
                        {...register("image")}
                        type='file'
                        accept='image/*'
                        className='p-2 mx-auto'
                    />
                </div>
                
                <div className="grid grid-cols-2 gap-5">
                    <div className="grid gap-1">
                        <label className={`text-[${COLORS.gray_dark_02}]`} style={{ ...FONTS.heading_08_bold }}>First Name</label>
                        <Input
                            {...register("first_name")}
                            placeholder={userDetail?.first_name || ""}
                            className={`w-full h-[45px] border border-[#716F6F] rounded-[8px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] hover:border-[${COLORS.primary}] focus:border-[${COLORS.primary}] focus:outline-none`}
                        />
                    </div>

                    <div className="grid gap-1">
                        <label className={`text-[${COLORS.gray_dark_02}]`} style={{ ...FONTS.heading_08_bold }}>Last Name</label>
                        <Input
                            {...register("last_name")}
                            placeholder={userDetail?.last_name || ""}
                            className={`w-full h-[45px] border border-[#716F6F] rounded-[8px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] hover:border-[${COLORS.primary}] focus:border-[${COLORS.primary}] focus:outline-none`}
                        />
                    </div>

                    <div className="grid gap-1">
                        <label className={`text-[${COLORS.gray_dark_02}]`} style={{ ...FONTS.heading_08_bold }}>Username</label>
                        <Input
                            readOnly
                            {...register("username")}
                            placeholder={userDetail?.username || ""}
                            className={`w-full h-[45px] border border-[#716F6F] rounded-[8px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] bg-gray-100 cursor-not-allowed`}
                        />
                    </div>

                    <div className="grid gap-1">
                        <label className={`text-[${COLORS.gray_dark_02}]`} style={{ ...FONTS.heading_08_bold }}>Email</label>
                        <Input
                            {...register("email")}
                            placeholder={userDetail?.email || ""}
                            className={`w-full h-[45px] border border-[#716F6F] rounded-[8px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] hover:border-[${COLORS.primary}] focus:border-[${COLORS.primary}] focus:outline-none`}
                        />
                    </div>

                    <div className="grid gap-1">
                        <label className={`text-[${COLORS.gray_dark_02}]`} style={{ ...FONTS.heading_08_bold }}>Contact</label>
                        <Input
                            {...register("phone_number")}
                            placeholder={userDetail?.phone_number || ""}
                            className={`w-full h-[45px] border border-[#716F6F] rounded-[8px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] hover:border-[${COLORS.primary}] focus:border-[${COLORS.primary}] focus:outline-none`}
                        />
                    </div>

                    <div className="grid gap-1">
                        <label className={`text-[${COLORS.gray_dark_02}]`} style={{ ...FONTS.heading_08_bold }}>Designation</label>
                        <Input
                            {...register("designation")}
                            placeholder={userDetail?.designation || ""}
                            className={`w-full h-[45px] border border-[#716F6F] rounded-[8px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] hover:border-[${COLORS.primary}] focus:border-[${COLORS.primary}] focus:outline-none`}
                        />
                    </div>

                    <div className='grid gap-1'>
                        <label className={`text-[${COLORS.gray_dark_02}]`} style={{ ...FONTS.heading_08_bold }}>Role</label>
                        <Select 
                            onValueChange={(value) => setValue("role", value)} 
                            defaultValue={userDetail?.role?.identity || ""}
                        >
                            <SelectTrigger 
                                style={{ height: '45px' }} 
                                className={`w-full border rounded-[8px] border-[#716F6F] pr-[16px] pl-[16px] text-[${COLORS.gray_dark_02}]`}
                            >
                                <SelectValue placeholder={userDetail?.role?.identity || "Select role"} />
                                <ChevronDownIcon className="size-4 opacity-50 text-[#716F6F]" />
                            </SelectTrigger>
                            <SelectContent className='bg-white'>
                                {groups.map((group) => (
                                    <SelectItem 
                                        key={group._id} 
                                        value={group._id} 
                                        className={`hover:bg-[${COLORS.primary}] p-2 my-1.5 rounded-[8px] cursor-pointer`}
                                        style={{ ...FONTS.heading_08 }}
                                    >
                                        {group.identity}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                
                <div className='flex justify-end gap-2 mt-6'>
                    <button 
                        type="button"
                        onClick={() => setShowEditModal(false)} 
                        style={{ ...FONTS.heading_08_bold }} 
                        className={`bg-[#D7F6F5] border border-[#1BBFCA] pr-[16px] pl-[16px] h-[40px] rounded-[8px] flex items-center gap-2 text-[#1BBFCA]`}
                    >
                        Cancel
                    </button>
                    <button 
                        type='submit' 
                        style={{ ...FONTS.heading_08_bold }} 
                        className='bg-[#1BBFCA] pr-[16px] pl-[16px] h-[40px] rounded-[8px] flex items-center gap-2 text-white'
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditDetails;