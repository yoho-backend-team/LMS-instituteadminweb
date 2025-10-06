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
    <>
      {/* Dropdown Menu */}
      <div className="flex flex-col items-start p-2 gap-2 sm:gap-3 w-[110px] sm:w-[120px] bg-white rounded-lg sm:rounded-xl shadow-lg z-20">
        {/* View Button */}
        <button
          onClick={handleView}
          className={`flex items-center px-2 sm:px-3 py-1.5 sm:py-2 gap-1.5 sm:gap-2 w-full rounded-md sm:rounded-lg border bg-gray-100 hover:bg-[${COLORS.primary}] hover:text-white transition-colors duration-200`}
        >
          <img 
            src={ViewIcon} 
            alt="View" 
            className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" 
          />
          <span className="font-[Poppins] text-[13px] sm:text-[15px] font-medium leading-[18px] sm:leading-[22px]">
            View
          </span>
        </button>

        {/* Delete Button */}
        <button
          onClick={() => setAlertModal(true)}
          className={`flex items-center px-2 sm:px-3 py-1.5 sm:py-2 gap-1.5 sm:gap-2 w-full rounded-md sm:rounded-lg border bg-gray-100 hover:bg-[${COLORS.primary}] hover:text-white transition-colors duration-200`}
        >
          <img 
            src={DeleteIcon} 
            alt="Delete" 
            className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" 
          />
          <span className="font-[Poppins] text-[13px] sm:text-[15px] font-medium leading-[18px] sm:leading-[22px]">
            Delete
          </span>
        </button>
      </div>

      {/* Alert Modal */}
      {alertModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="fixed z-50 w-[90%] max-w-[402px] sm:w-[380px] md:w-[402px] min-h-[250px] sm:min-h-[279px] bg-white rounded-[12px] flex flex-col gap-5 sm:gap-[30px] p-4 sm:p-5 md:p-6 justify-center items-center shadow-2xl">
            {/* Warning Content */}
            <div className="grid gap-2 sm:gap-3 w-full">
              <img
                className="w-[70px] h-[70px] sm:w-[85px] sm:h-[85px] md:w-[100px] md:h-[100px] mx-auto"
                src={warning}
                alt="Warning"
              />
              <h2
                className={`text-[${COLORS.gray_dark_02}] text-center text-lg sm:text-xl md:text-2xl px-2`}
                style={{ ...FONTS.heading_04_bold }}
              >
                Confirm Action
              </h2>
              <p
                className={`text-[${COLORS.gray_light}] text-center text-sm sm:text-base px-2`}
                style={{ ...FONTS.heading_07 }}
              >
                Are you sure you want to delete the user?
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 w-full sm:w-auto">
              <button
                onClick={() => setAlertModal(false)}
                style={{ ...FONTS.heading_08_bold }}
                className={`bg-[#D7F6F5] border border-[#1BBFCA] px-4 sm:px-5 md:px-6 h-[38px] sm:h-[40px] rounded-[8px] flex items-center justify-center gap-2 text-[#1BBFCA] text-sm sm:text-base hover:bg-[#C5EAE9] transition-colors duration-200 min-w-[120px] sm:min-w-[100px]`}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                type="submit"
                style={{ ...FONTS.heading_08_bold }}
                className="bg-[#1BBFCA] px-4 sm:px-5 md:px-6 h-[38px] sm:h-[40px] rounded-[8px] flex items-center justify-center gap-2 text-white text-sm sm:text-base hover:bg-[#169BA5] transition-colors duration-200 min-w-[120px] sm:min-w-[100px]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardOptions;