import React from 'react';
import { COLORS, FONTS } from '../../constants/uiConstants';

interface TimelineItemProps {
  title: string;
  description: string;
  timestamp: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ title, description, timestamp }) => {
  return (
    <div className="flex items-start gap-4 pb-6">
      {/* Green dot indicator */}
      <div className="flex-shrink-0 w-3 h-3 bg-green-500 rounded-full mt-1"></div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h3 style={{...FONTS.heading_07,color:COLORS.gray_dark_03}} >{title}</h3>
          <span style={{...FONTS.heading_09,color:COLORS.gray_dark_03}} className="whitespace-nowrap ml-4">{timestamp}</span>
        </div>
        <p style={{...FONTS.heading_08,color:COLORS.gray_dark_03}} className="leading-relaxed">{description} <br />{timestamp}</p>
      </div>
    </div>
  );
};

const Activitypage: React.FC = () => {
  const activities = [
    {
      title: "Password Reset Request",
      description: "Password reset requested for user with email vicog76659@tubaceo.com ",
      timestamp: "5/7/2026 - 5:59:50 PM"
    },
    {
      title: "Password Reset Successfully",
      description: "Password reset successfully for user with email vicog76659@tubaceo.com",
      timestamp: "4/7/2026 - 5:59:50 PM"
    },
    {
      title: "Password Reset Request",
      description: "Password reset requested for user with email vicog76659@tubaceo.com ",
      timestamp: "4/7/2026 - 5:59:50 PM"
    }
  ];

  return (
    <div className="bg-white p-6 min-h-screen">
      <h1 style={{...FONTS.heading_04,color:COLORS.gray_dark_02}} className=" mb-6">User Activity Timeline</h1>
      
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-1.5 top-3 bottom-0 w-px bg-gray-200"></div>
        
        {/* Timeline items */}
        <div className="relative">
          {activities.map((activity, index) => (
            <TimelineItem
              key={index}
              title={activity.title}
              description={activity.description}
              timestamp={activity.timestamp}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activitypage;