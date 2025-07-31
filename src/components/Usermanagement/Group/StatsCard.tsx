import React, { useState } from "react";
import { Menu } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

const dummycard = [
  { name: "John William", totalusers: "0" },
  { name: "Kamal", totalusers: "0" },
  { name: "Bhuvana", totalusers: "0" },
];

const StatusDropdown = () => {
  const [status, setStatus] = useState("Active");

  return (
    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      className="text-sm rounded px-3 py-1 bg-[#10CFC9] text-white"
    >
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </select>
  );
};

function StatsCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {dummycard.map((card, idx) => (
        <div
          key={idx}
          className="relative rounded-lg bg-white shadow-md p-4 pt-6"
        >
          {/* Three Dots Menu */}
          <div className="absolute top-3 right-3">
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button>
                <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
              </Menu.Button>

              <Menu.Items className="absolute right-0 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="py-1 text-sm text-gray-700">
                  <Menu.Item>
                    {({ active }: { active: boolean }) => (
                      <button
                        className={`block w-full text-left px-4 py-2 ${
                          active ? "bg-gray-100" : ""
                        }`}
                      >
                        View
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }: { active: boolean }) => (
                      <button
                        className={`block w-full text-left px-4 py-2 ${
                          active ? "bg-gray-100" : ""
                        }`}
                      >
                        Edit
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }: { active: boolean }) => (
                      <button
                        className={`block w-full text-left px-4 py-2 ${
                          active
                            ? "bg-gray-100 text-red-600"
                            : "text-red-600"
                        }`}
                      >
                        Delete
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </div>

          {/* Name and User Count */}
          <h2 className="text-lg font-semibold mb-1">{card.name}</h2>
          <p className="text-sm text-gray-600 mb-4">
            Total {card.totalusers} Users
          </p>

          {/* Status Dropdown */}
          <StatusDropdown />
        </div>
      ))}
    </div>
  );
}

export default StatsCard;
