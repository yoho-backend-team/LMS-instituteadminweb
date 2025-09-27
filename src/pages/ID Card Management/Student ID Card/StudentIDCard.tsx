import { useEffect, useState, useRef } from "react";
import { COLORS, FONTS } from "../../../constants/uiConstants";
import bgImage from "../../../assets/IDcardManagement/Group 1000000936.png";
import barCode from "../../../assets/IDcardManagement/barcode.png";
import { useDispatch, useSelector } from "react-redux";
import { selectStudentId } from "../../../features/StudentIdCard/reducers/selectors";
import { getIdcardthunks } from "../../../features/StudentIdCard/reducers/thunks";
import { GetImageUrl } from "../../../utils/helper";
import Shimmer from "../../../components/IdcardShimmer/Shimmer";
import { GetLocalStorage } from "../../../utils/localStorage";
import html2canvas from "html2canvas";

const StudentIDCard = () => {
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
  const studentID = useSelector(selectStudentId);

  useEffect(() => {
    (async () => {
      const paramsData = {
        branchid: GetLocalStorage("selectedBranchId"),
        instituteid: GetLocalStorage("instituteId"),
        page: 1,
      };
      const response = await dispatch(getIdcardthunks(paramsData));
      if (response?.status === "success") {
        setIsLoading(false);
      }
    })();
  }, [dispatch]);

  // Download function without including the button
  const handleDownload = async (index: number, name: string) => {
    const cardElement = cardRefs.current[index];
    if (!cardElement) return;

    // Hide the download button temporarily
    const button = cardElement.querySelector("button");
    if (button) (button as HTMLElement).style.display = "none";

    const canvas = await html2canvas(cardElement, {
      useCORS: true,
      scale: 2,
    });

    // Restore the button
    if (button) (button as HTMLElement).style.display = "block";

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${name}_ID_Card.png`;
    link.click();
  };

  return (
    <div>
      <h1 style={{ ...FONTS.heading_04_bold, color: COLORS.gray_dark_01 }}>
        Student ID Card
      </h1>

      {isLoading ? (
        <Shimmer />
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {studentID?.map((data: any, index: number) => (
            <div
              key={index}
              className="w-[370px] h-[560px] perspective-1000"
              ref={(el) => (cardRefs.current[index] = el)}
            >
              <section
                className={`w-full h-full shadow-[0px_4px_24px_0px_#00000026] rounded-xl transition-transform duration-700 cursor-pointer relative`}
                onClick={() => handleCardClick(index)}
                style={{
                  transformStyle: "preserve-3d",
                  transform: flippedCards[index] ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front Side */}
                <div
                  className={`absolute w-full h-full rounded-xl border-b-[15px] border-[${COLORS.primary}] bg-white`}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div
                    className="bg-cover bg-center h-[220px] w-full bg-no-repeat flex justify-center items-center"
                    style={{ backgroundImage: `url(${bgImage})` }}
                  >
                    <img
                      src={GetImageUrl(data?.image) ?? undefined}
                      alt={data?.name}
                      className="w-[130px] h-[130px] rounded-full object-cover"
                    />
                  </div>

                  <div className="text-center">
                    <h4 style={{ ...FONTS.heading_04_bold, color: COLORS.gray_dark_02 }}>
                      {data?.name}
                    </h4>
                    <p style={{ ...FONTS.heading_12, color: COLORS.gray_light }}>
                      {data?.role?.identity}
                    </p>
                  </div>

                  <div className="px-8 py-5 grid gap-2">
                    <p style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>
                      ID NO : <span style={{ ...FONTS.heading_13 }}>{data?.student_id}</span>
                    </p>
                    <p style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>
                      User Name : <span style={{ ...FONTS.heading_13 }}>{data?.name}</span>
                    </p>
                    <p style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>
                      Email : <span style={{ ...FONTS.heading_13 }}>{data?.email}</span>
                    </p>
                    <p style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>
                      Phone : <span style={{ ...FONTS.heading_13 }}>{data?.contact}</span>
                    </p>
                  </div>

                  <div className="p-4 mb-3">
                    <img src={barCode} alt="" className="w-[70%] h-12 m-auto" />
                  </div>
                </div>

                {/* Back Side */}
                <div
                  className={`absolute w-full h-full bg-white rounded-xl overflow-hidden border-t-[15px] border-[${COLORS.primary}]`}
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <div className="h-full relative flex flex-col justify-between p-6">
                    <div className="py-5 grid gap-4">
                      <div className="flex">
                        <div className="w-1/3 flex justify-between">
                          <span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>
                            User Name
                          </span>
                          <span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>:</span>
                        </div>
                        <span style={{ ...FONTS.heading_13 }} className="w-2/3 pl-6">
                          {data?.name}
                        </span>
                      </div>

                      <div className="flex">
                        <div className="w-1/3 flex justify-between">
                          <span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>Email</span>
                          <span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>:</span>
                        </div>
                        <span style={{ ...FONTS.heading_13 }} className="w-2/3 pl-6 break-words">
                          {data?.email}
                        </span>
                      </div>

                      <div className="flex">
                        <div className="w-1/3 flex justify-between">
                          <span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>Role</span>
                          <span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>:</span>
                        </div>
                        <span style={{ ...FONTS.heading_13 }} className="w-2/3 pl-6">
                          {data?.role?.identity}
                        </span>
                      </div>

                      <div className="flex">
                        <div className="w-1/3 flex justify-between">
                          <span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>ID NO</span>
                          <span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>:</span>
                        </div>
                        <span style={{ ...FONTS.heading_13 }} className="w-2/3 pl-6">
                          {data?.student_id}
                        </span>
                      </div>

                      <div className="flex">
                        <div className="w-1/3 flex justify-between">
                          <span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>Phone</span>
                          <span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>:</span>
                        </div>
                        <span style={{ ...FONTS.heading_13 }} className="w-2/3 pl-6">
                          {data?.contact}
                        </span>
                      </div>

                      <div className="flex">
                        <div className="w-1/3 flex justify-between">
                          <span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>Address</span>
                          <span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>:</span>
                        </div>
                        <span style={{ ...FONTS.heading_13 }} className="w-2/3 pl-6">
                          {data?.address?.address_line_one}, {data?.address?.address_line_two}, {data?.address?.city},{" "}
                          {data?.address?.state} - {data?.address?.pin_code}
                        </span>
                      </div>
                    </div>

                    <button
                      className="mb-4 py-1 text-white rounded-[8px]"
                      style={{ background: COLORS.light_green, ...FONTS.heading_07_bold }}
                      onClick={(e) => {
                        e.stopPropagation();
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

export default StudentIDCard;
