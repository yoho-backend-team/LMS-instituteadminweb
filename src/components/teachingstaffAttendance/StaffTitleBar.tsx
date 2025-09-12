import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import close from "../../assets/close.png";
import { Calendar } from "lucide-react";
const StaffTitleBar: React.FC = () => {
  const [Filter, setFilter] = useState(false);

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full bg-[#1BBFCA] flex justify-between rounded-md items-center p-4">
        <div className="flex items-center gap-5">
          <Calendar className="text-white " size={40} />
          <p className="text-2xl text-white font-bold">STAFF ATTENDANCE</p>
        </div>
        <div
          className="text-[#3ABE65] text-2xl font-bold rounded-md bg-white p-2 cursor-pointer"
          onClick={() => setFilter(!Filter)}
        >
          {Filter ? (
            <img src={close} alt="" className="w-[37px] h-[32px]" />
          ) : (
            "GO"
          )}
        </div>
      </div>

      <AnimatePresence>
        {Filter && (
          <motion.div
            key="filter"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-white p-4 flex flex-col justify-between gap-5 shadow-[0px_4px_24px_0px_#00000026] rounded-md"
          >
            <p className="text-[#716F6F] font-semibold text-2xl">Filters</p>
            <div className="grid w-full grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <p className="text-[#716F6F]">Batch</p>
                <select className="border-2 w-full border-[#716F6F] text-[#716F6F] rounded-md p-2">
                  <option value="">batch 1</option>
                  <option value="">batch 2</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[#716F6F]">Search</p>
                <input
                  type="text"
                  className="w-full border-2 text-[#716F6F] border-[#716F6F] rounded-md p-2 focus:outline-none"
                  placeholder="Search Batch"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StaffTitleBar;
