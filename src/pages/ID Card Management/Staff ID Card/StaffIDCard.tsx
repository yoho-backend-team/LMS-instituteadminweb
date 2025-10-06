import { useEffect, useState, useRef } from "react";
import { COLORS, FONTS } from "../../../constants/uiConstants";
import bgImage from "../../../assets/IDcardManagement/staffIdBg.png";
import barCode from "../../../assets/IDcardManagement/barcode.png";
import { useDispatch, useSelector } from "react-redux";
import { selectStaffId } from "../../../features/StaffIdCard/reducers/selectors";
import { getStaffIdcardthunks } from "../../../features/StaffIdCard/reducers/thunks";
import { GetImageUrl } from "../../../utils/helper";
import Shimmer from "../../../components/IdcardShimmer/Shimmer";
import { GetLocalStorage } from "../../../utils/localStorage";
import html2canvas from "html2canvas";

const StaffIDCard = () => { 
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleCardClick = (index: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const dispatch = useDispatch<any>();
  const staffIdCard = useSelector(selectStaffId);

  useEffect(() => {
    (async () => {
      const paramsData = {
        branchid: GetLocalStorage("selectedBranchId"),
        instituteid: GetLocalStorage("instituteId"),
        page: 1,
      };
      const response = await dispatch(getStaffIdcardthunks(paramsData));
      if (response?.status === "success") {
        setIsLoading(false);
      }
    })();
  }, [dispatch]);

  // Download function without including the download button
  const handleDownload = async (index: number, name: string) => {
    const cardElement = cardRefs.current[index];
    if (!cardElement) return;

    // Hide the download button temporarily
    const button = cardElement.querySelector("button");
    if (button) (button as HTMLElement).style.display = "none";

    // @ts-ignore
    const canvas = await html2canvas(cardElement, {
      useCORS: true,
      // scale: 2,
    });

    // Restore the button
    if (button) (button as HTMLElement).style.display = "block";

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${name}_Staff_ID_Card.png`;
    link.click();
  };

  return (
    <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-4 sm:py-6 md:py-8">
      <h1 
        style={{ ...FONTS.heading_04_bold, color: COLORS.gray_dark_01 }}  
        className="mb-4 sm:mb-6 md:mb-8 text-lg sm:text-xl md:text-2xl lg:text-3xl text-center sm:text-left"
      >
        Staff ID Card
      </h1>

      {isLoading ? (
        <Shimmer />
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 justify-items-center">
          {staffIdCard?.map((data: any, index: number) => (
            <div
              key={index}
              className="w-full max-w-[280px] xs:max-w-[300px] sm:max-w-[320px] md:max-w-[340px] lg:max-w-[350px] xl:max-w-[360px] 
                         h-[400px] xs:h-[420px] sm:h-[440px] md:h-[460px] lg:h-[480px] xl:h-[500px] 
                         perspective-1000 mx-auto"
              ref={(el: any) => (cardRefs.current[index] = el)}
            >
              <section
                className="w-full h-full shadow-[0px_2px_12px_0px_#0000001a] sm:shadow-[0px_4px_24px_0px_#00000026] rounded-lg sm:rounded-xl transition-transform duration-700 cursor-pointer relative"
                onClick={() => handleCardClick(index)}
                style={{
                  transformStyle: "preserve-3d",
                  transform: flippedCards[index]
                    ? "rotateY(180deg)"
                    : "rotateY(0deg)",
                }}
              >
                {/* Front Side */}
                <div
                  className={`absolute w-full h-full rounded-lg sm:rounded-xl border-b-[6px] xs:border-b-[8px] sm:border-b-[10px] md:border-b-[12px] lg:border-b-[15px] border-[${COLORS.primary}] bg-white flex flex-col`}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {/* Header with background image */}
                  <div
                    className="bg-cover bg-center h-[100px] xs:h-[110px] sm:h-[120px] md:h-[140px] lg:h-[160px] xl:h-[180px] w-full bg-no-repeat flex justify-center items-center flex-shrink-0"
                    style={{ backgroundImage: `url(${bgImage})` }}
                  >
                    <img
                      src={GetImageUrl(data?.image) ?? undefined}
                      alt={data?.name}
                      className="w-[60px] h-[60px] xs:w-[65px] xs:h-[65px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] lg:w-[90px] lg:h-[90px] xl:w-[100px] xl:h-[100px] rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
                    />
                  </div>
                  
                  {/* Name and Role */}
                  <div className="text-center px-2 py-1 sm:py-2 flex-shrink-0">
                    <h4 
                      style={{ ...FONTS.heading_04_bold, color: COLORS.gray_dark_02 }}
                      className="text-sm sm:text-base truncate px-2"
                    >
                      {data?.name}
                    </h4>
                    <p 
                      style={{ ...FONTS.heading_12, color: COLORS.gray_light }}
                      className="text-xs mt-0.5"
                    >
                      {data?.role?.identity}
                    </p>
                  </div>

                  {/* Info Section */}
                  <div className="px-3 sm:px-4 md:px-5 py-1 sm:py-2 md:py-3 grid gap-1 flex-1 min-h-0">
                    <div className="flex justify-between items-center">
                      <span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }} className="text-xs">
                        ID NO :
                      </span>
                      <span style={{ ...FONTS.heading_13 }} className="text-xs">
                        ANN-TIR-STDNT0019
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }} className="text-xs">
                        User Name :
                      </span>
                      <span style={{ ...FONTS.heading_13 }} className="text-xs truncate ml-1 max-w-[100px] xs:max-w-[110px]">
                        {data?.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }} className="text-xs">
                        Email :
                      </span>
                      <span style={{ ...FONTS.heading_13 }} className="text-xs truncate ml-1 max-w-[100px] xs:max-w-[110px]">
                        {data?.email}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }} className="text-xs">
                        Phone :
                      </span>
                      <span style={{ ...FONTS.heading_13 }} className="text-xs">
                        {data?.contact}
                      </span>
                    </div>
                  </div>

                  {/* Barcode Section */}
                  <div className="p-2 sm:p-3 md:p-3 flex-shrink-0">
                    <img src={barCode} alt="" className="w-[50%] xs:w-[55%] sm:w-[60%] md:w-[65%] h-6 xs:h-7 sm:h-8 md:h-9 lg:h-10 m-auto" />
                  </div>
                </div>

                {/* Back Side */}
                <div
                  className={`absolute w-full h-full bg-white rounded-lg sm:rounded-xl overflow-hidden border-t-[6px] xs:border-t-[8px] sm:border-t-[10px] md:border-t-[12px] lg:border-t-[15px] border-[${COLORS.primary}] flex flex-col`}
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <div className="h-full relative flex flex-col justify-between p-3 sm:p-4 md:p-4 lg:p-5">
                    <div className="py-1 sm:py-2 md:py-3 grid gap-1 sm:gap-1.5 md:gap-2 flex-1 min-h-0 overflow-y-auto">
                      {[
                        { label: "User Name", value: data?.name },
                        { label: "Email", value: data?.email },
                        { label: "Role", value: data?.role?.identity },
                        { label: "ID NO", value: "ANN-TIR-STDNT0019" },
                        { label: "Contact", value: data?.contact },
                        {
                          label: "Address",
                          value: `${data?.address?.address_line_one ?? ""}, ${data?.address?.address_line_two ?? ""}, ${data?.address?.city ?? ""}, ${data?.address?.state ?? ""} - ${data?.address?.pin_code ?? ""}`,
                        },
                      ].map((item, i) => (
                        <div className="flex items-start" key={i}>
                          <div className="w-2/5 flex justify-between min-w-[65px] xs:min-w-[70px] sm:min-w-[75px]">
                            <span 
                              style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }} 
                              className="text-xs"
                            >
                              {item.label}
                            </span>
                            <span 
                              style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }} 
                              className="text-xs"
                            >
                              :
                            </span>
                          </div>
                          <span 
                            style={{ ...FONTS.heading_13 }} 
                            className="w-3/5 pl-1 sm:pl-1.5 md:pl-2 text-xs break-words leading-tight"
                          >
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      className="py-1.5 sm:py-2 text-white rounded-[4px] sm:rounded-[6px] w-full text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity flex-shrink-0"
                      style={{ background: COLORS.light_green }}
                      onClick={(e) => {
                        e.stopPropagation(); // prevent card flip
                        handleDownload(index, data?.name);
                      }}
                    >
                      Download
                    </button>
                  </div>
                </div>
              </section>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StaffIDCard;