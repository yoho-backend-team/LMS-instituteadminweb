import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

const TABS = ["Info", "Security", "Classes", "Attendance", "Activity"];

const MainPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Info");

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card className="p-6 mb-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">Elon Musk</h3>
        </div>
        <Button className="bg-green-500 hover:bg-green-600 text-white">Active</Button>
      </Card>

      <div className="flex gap-2 mb-6 flex-wrap">
        {TABS.map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "outline"}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

    </div>
  );
};

export default MainPage;
