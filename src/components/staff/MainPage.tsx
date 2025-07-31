import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import Infopage from "./Infopage";
import Securitypage from "./Securitypage";
import Classespage from "./Classespage";
import Activitypage from "./Activitypage";
import Attendancepage from "./Attendancepage";

const TABS = ["Info", "Security", "Classes", "Attendance", "Activity"];

const MainPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Info");

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card className="p-6 mb-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">Elon Musk</h3>
        </div>
        <Button className="bg-[#3ABE65] text-white">Active</Button>
      </Card>

      <div className="flex gap-2 mb-6 flex-wrap">
        {TABS.map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "outline"}
            onClick={() => setActiveTab(tab)}
            className={`${activeTab === tab ? "bg-[#3ABE65] text-white" : "bg-white text-gray-700"}`}
          >
            {tab}
          </Button>
        ))}
      </div>

      <div className="p-4 ">
        {activeTab === "Info" && <Infopage />}
        {activeTab === "Security" && <Securitypage /> }
        {activeTab === "Classes" && <Classespage />}
        {activeTab === "Attendance" && <Attendancepage />}
        {activeTab === "Activity" && <Activitypage />}
      </div>
    </div>
  );
};

export default MainPage;
