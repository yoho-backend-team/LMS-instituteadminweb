import { ChevronDownIcon } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../../components/ui/select";
import { COLORS, FONTS } from "../../../../constants/uiConstants";
import { GetImageUrl } from "../../../../utils/helper";
import { SlOptionsVertical } from "react-icons/sl";
import CardOptions from "./cardOptions";
import { useState } from "react";


type props = {
    Users: () => void;
}

const UsersList: React.FC<props> = ({ Users }) => {
    const [cardOptionsShow, setCardOptionsShow] = useState<number | null>(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Users?.map((card, index)=> (<div key={index} className="shadow-[0px_4px_20px_rgba(0,0,0,0.25)] rounded-[12px] p-[16px] grid gap-[20px] bg-white">
                <div className="flex gap-3.5 items-center justify-between relative">
                    <div className="flex gap-4">
                        <img
                            src={GetImageUrl(card?.image) ?? undefined}
                            className="w-[62px] h-[62px] rounded-full object-cover items-start"
                            alt="Student"
                        />
                        <div className="mr-4 grid gap-2">
                            <p
                                className={`text-[${COLORS.gray_dark_02}] !font-semibold`}
                                style={{ ...FONTS.heading_06 }}
                            >
                                {card?.first_name +" "+card?.last_name}
                            </p>
                            <p
                                className={`text-[${COLORS.gray_light}]`}
                                style={{ ...FONTS.heading_12 }}
                            >
                                {card?.email}
                            </p>
                            <p
                                className={`text-[${COLORS.gray_light}]`}
                                style={{ ...FONTS.heading_12 }}
                            >
                                {card?.phone_number}
                            </p>
                        </div>
                    </div>


                    <div className="flex items-start h-full">
                        <button className="bg-white" onClick={() => setCardOptionsShow(cardOptionsShow === index ? null : index)}>
                            <SlOptionsVertical className={`text-[${COLORS.primary}]`}/>
                        </button>
                        {cardOptionsShow === index && <CardOptions uuid={card?.uuid}/>}
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <p className={`text-[${COLORS.light_green}]`}>
                        <span style={{ ...FONTS.heading_12 }}>Role : </span>
                        <span className="font-bold">{card?.role?.identity}</span>
                    </p>

                    <Select>
                        <SelectTrigger
                            className={`w-[110px] h-[48px] border text-white rounded-[8px] pr-[16px] pl-[16px] bg-[${COLORS.primary}]`}
                        >
                            <SelectValue placeholder={card?.is_active ? "Active" : "Inactive"} />
                            <ChevronDownIcon className="size-4 opacity-50 text-[#FFFFFF]" />
                        </SelectTrigger>

                        <SelectContent className="bg-white text-black border p-2 rounded-[8px]">
                            <SelectItem
                                value="active"
                                className={`hover:bg-[${COLORS.primary}] text-[${COLORS.primary}] bg-white focus:bg-[${COLORS.primary}] p-2 my-1.5 focus:text-white rounded-[8px] cursor-pointer`}
                                style={{ ...FONTS.heading_08 }}
                            >
                                Active
                            </SelectItem>
                            <SelectItem
                                value="inactive"
                                className={`hover:bg-[${COLORS.primary}] text-[${COLORS.primary}] bg-white focus:bg-[${COLORS.primary}] p-2 focus:text-white rounded-[8px] cursor-pointer`}
                                style={{ ...FONTS.heading_08 }}
                            >
                                Inactive
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>))}
        </div>
    );
};

export default UsersList;
