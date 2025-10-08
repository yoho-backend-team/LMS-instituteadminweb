import { useEffect, useState } from "react";
import { IoMdCall, IoMdMail } from "react-icons/io";
import { FaChevronRight, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { getHelpCenterAll } from "../../features/HelpCenter/service";

const HelpFAQ = () => {
  const [helpCenter, setHelpCenter] = useState<any[]>([]);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchHelpCenter = async () => {
    try {
      setLoading(true);
      const response = await getHelpCenterAll("");
      setHelpCenter(response || []);
      if (response && response.length > 0) {
        setSelectedModule(response[0].module);
      }
    } catch (error) {
      console.error("Failed to fetch help center:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHelpCenter();
  }, []);

  const modules = Array.from(new Set(helpCenter.map((item) => item.module)));
  const filteredTitles = helpCenter.filter(
    (item) => item.module === selectedModule
  );

  return (
    <div className="p-3">
      <div className="bg-[#1BBFCA] p-5 text-white text-lg rounded-md font-bold">
        CUSTOMER
      </div>

      {/* Responsive layout */}
      <div className="flex flex-col md:flex-row mt-5 gap-5">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-white rounded-2xl shadow-2xl p-4">
          {loading ? (
            <div className="space-y-3 animate-pulse">
              {Array.from({ length: modules.length }).map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded-md w-full"></div>
              ))}
            </div>
          ) : (
            modules.map((module, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-2 cursor-pointer rounded ${selectedModule === module
                  ? "bg-[#1BBFCA] text-white"
                  : "hover:bg-gray-100 text-[#716F6F]"
                  }`}
                onClick={() => {
                  setSelectedModule(module);
                  setSelectedTitle(null);
                }}
              >
                <h1 className="text-lg">{module}</h1>
                <FaChevronRight />
              </div>
            ))
          )}
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4 bg-white rounded-2xl shadow-2xl p-4">
          <>
            {loading ? (
              <div className="space-y-3 animate-pulse">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-10 bg-gray-200 rounded-md w-full"></div>
                ))}
                <div className="h-24 bg-gray-200 rounded-md mt-4"></div>
              </div>
            ) : (
              <>
                <ul className="space-y-2">
                  {filteredTitles.map((data, i) => (
                    <li
                      key={i}
                      className={`flex items-center justify-between p-3 rounded shadow cursor-pointer transition-colors ${selectedTitle === data.title
                        ? " text-white border bg-[#1BBFCA]"
                        : "bg-gray-50 text-[#716F6F] hover:bg-gray-100"
                        }`}
                      onClick={() =>
                        setSelectedTitle(
                          selectedTitle === data.title ? null : data.title
                        )
                      }
                    >
                      <span>{data.title}</span>
                      {selectedTitle === data.title ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </li>
                  ))}
                </ul>

                {selectedTitle && (
                  <div className="mt-4 bg-gray-50 p-4 rounded text-[#716F6F] shadow">
                    <p>
                      {
                        filteredTitles.find(
                          (item) => item.title === selectedTitle
                        )?.description
                      }
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        </div>
      </div>

      {/* Responsive grid for contact cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-5 gap-5 text-[#716F6F]">
        <div className="bg-white p-5 rounded-2xl shadow-2xl">
          <div className="bg-[#1BBFCA] w-12 h-11 rounded-md p-3">
            <IoMdCall className="fill-white h-6 w-6" />
          </div>
          <div className="mt-3 font-bold">+ (810) 2548 2568</div>
          <div className="mt-3">We are always happy to help!</div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-2xl">
          <div className="bg-[#1BBFCA] w-12 h-11 rounded-md p-3">
            <IoMdCall className="fill-white h-6 w-6" />
          </div>
          <div className="mt-3 font-bold">+ (910) 4598761</div>
          <div className="mt-3">We are always happy to help!</div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-2xl">
          <div className="bg-[#1BBFCA] w-12 h-11 rounded-md p-3">
            <IoMdMail className="fill-white h-6 w-6" />
          </div>
          <div className="mt-3 font-bold">help@gmail.com</div>
          <div className="mt-3">Best way to get answer fast!</div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-2xl">
          <div className="bg-[#1BBFCA] w-12 h-11 rounded-md p-3">
            <IoMdMail className="fill-white h-6 w-6" />
          </div>
          <div className="mt-3 font-bold">customerhelp@gmail.com</div>
          <div className="mt-3">Best way to get answer fast!</div>
        </div>
      </div>
    </div>
  );
};

export default HelpFAQ;
