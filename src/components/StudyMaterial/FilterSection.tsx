// import type React from "react";
// import { FaChevronDown } from "react-icons/fa";

// interface FilterOption {
//   label: string;
//   value: string;
//   options: string[];
// }

// interface FilterSectionProps {
//   isVisible: boolean;
//   filters: FilterOption[];
//   values: Record<string, string>;
//   onChange: (key: string, value: string) => void;
// }

// export const FilterSection: React.FC<FilterSectionProps> = ({
//   isVisible,
//   filters,
//   values,
//   onChange,
// }) => {
//   if (!isVisible) return null;

//   return (
//     <div className="mt-4 bg-white p-6 rounded-xl shadow-2xl flex gap-6">
//       {filters.map((filter) => (
//         <div key={filter.value} className="flex flex-col w-full relative">
//           <label className="text-md font-semibold text-gray-600 mb-1">
//             {filter.label}
//           </label>
//           <div className="relative">
//             <select
//               className="appearance-none border border-gray-300 w-full rounded-md px-3 py-2 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={values[filter.value] || ""}
//               onChange={(e) => onChange(filter.value, e.target.value)}
//             >
             
//               {filter.options.map((option) => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>

//             {/* Custom Chevron Icon */}
//             <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
//               <FaChevronDown className="text-sm" />
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

import type React from "react";
import { FaChevronDown } from "react-icons/fa";

interface FilterOption {
  label: string;
  value: string;
  options: string[];
}

interface FilterSectionProps {
  isVisible: boolean;
  filters: FilterOption[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onReset: () => void; // new prop for reset
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  isVisible,
  filters,
  values,
  onChange,
  onReset,
}) => {
  if (!isVisible) return null;

  return (
    <div className="mt-4 bg-white p-6 rounded-xl shadow-2xl flex gap-6 flex-wrap items-end">
      {filters.map((filter) => (
        <div key={filter.value} className="flex flex-col w-full sm:w-1/3 relative">
          <label className="text-md font-semibold text-gray-600 mb-1">
            {filter.label}
          </label>
          <div className="relative">
            <select
              className="appearance-none border border-gray-300 w-full rounded-md px-3 py-2 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={values[filter.value] || ""}
              onChange={(e) => onChange(filter.value, e.target.value)}
            >
              {filter.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
              <FaChevronDown className="text-sm" />
            </div>
          </div>
        </div>
      ))}

      {/* Reset Button */}
      <div className="flex items-center mt-4 sm:mt-0">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
          onClick={onReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
