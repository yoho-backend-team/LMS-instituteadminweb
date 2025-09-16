import ViewIcon from "../../../../assets/viewimggray.png";
import DeleteIcon from "../../../../assets/delete.png";
import { COLORS, FONTS } from "../../../../constants/uiConstants";
import { useNavigate } from "react-router-dom";
import warning from "../../../../assets/warning.png";
import { useState } from "react";
import { deleteUsers } from "../service";

type props = {
  uuid: string;
};

const CardOptions: React.FC<props> = ({ uuid }) => {
  const [alertModal, setAlertModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleView = () => {
    navigate(`/users/details/${uuid}`);
  };

  const handleDelete = async () => {
    try {
      await deleteUsers(uuid);
      setAlertModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-start p-2 gap-3 w-[120px] bg-white rounded-xl  shadow-lg z-20">
      <button
        onClick={handleView}
        className={`flex items-center px-3 py-2 gap-2 w-full rounded-lg border bg-gray-100 hover:bg-[${COLORS.primary}] transition`}
      >
        <img src={ViewIcon} alt="View" className="w-5 h-5" />
        <span className="font-[Poppins] text-[15px] font-medium leading-[22px]">
          View
        </span>
      </button>

      <button
        onClick={() => setAlertModal(true)}
        className={`flex items-center px-3 py-2 gap-2 w-full rounded-lg border bg-gray-100 hover:bg-[${COLORS.primary}] transition`}
      >
        <img src={DeleteIcon} alt="Delete" className="w-5 h-5" />
        <span className="font-[Poppins] text-[15px] font-medium leading-[22px]">
          Delete
        </span>
      </button>
      {alertModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40">
          <div className="fixed z-50 left-1/2 top-1/2 transform lg:-translate-x-1/4 lg:-translate-y-1/4 md:-translate-x-1/3 md:-translate-y-1/3  w-[402px] h-[279px] bg-white rounded-[12px] flex flex-col gap-[30px] p-4 justify-center items-center">
            <div className="grid gap-2">
              <img
                className="w-[100px] h-[100px] mx-auto"
                src={warning}
                alt="Warning"
              />
              <h2
                className={`text-[${COLORS.gray_dark_02}] text-center`}
                style={{ ...FONTS.heading_04_bold }}
              >
                Confirm Action
              </h2>
              <p
                className={`text-[${COLORS.gray_light}] text-center`}
                style={{ ...FONTS.heading_07 }}
              >
                Are you sure you want to delete the user?
              </p>
            </div>
            <div className="flex gap-5">
              <button
                onClick={() => setAlertModal(false)}
                style={{ ...FONTS.heading_08_bold }}
                className={`bg-[#D7F6F5] border border-[#1BBFCA] px-4 h-[40px] rounded-[8px] flex items-center gap-2 text-[#1BBFCA]`}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                type="submit"
                style={{ ...FONTS.heading_08_bold }}
                className="bg-[#1BBFCA] px-4 h-[40px] rounded-[8px] flex items-center gap-2 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardOptions;
