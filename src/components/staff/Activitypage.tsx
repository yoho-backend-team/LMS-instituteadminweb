import React, { useEffect } from 'react';
import { COLORS, FONTS } from '../../constants/uiConstants';
import { useDispatch, useSelector } from 'react-redux';
import { getActivityData } from '../../features/staff/reducers/thunks';
import { selectActivity } from '../../features/staff/reducers/selector';

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
          <h3 style={{ ...FONTS.heading_07, color: COLORS.gray_dark_03 }}>{title}</h3>
          <span style={{ ...FONTS.heading_09, color: COLORS.gray_dark_03 }} className="whitespace-nowrap ml-4">{timestamp}</span>
        </div>
        <p style={{ ...FONTS.heading_08, color: COLORS.gray_dark_03 }} className="leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

interface activityId {
  activityId: any;
}


const Activitypage: React.FC<activityId> = (activityId) => {
  const dispatch = useDispatch<any>();
  const activity = useSelector(selectActivity);
  const activityData = activity?.data?.logs || [];

  // console.log("activity",activityId?.activityId);

  useEffect(() => {
    dispatch(getActivityData({ staff: activityId?.activityId }));
  }, [dispatch]);

  return (
    <div className="bg-white p-6 min-h-screen">
      <h1 style={{ ...FONTS.heading_04, color: COLORS.gray_dark_02 }} className="mb-6">User Activity Timeline</h1>
      
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-1.5 top-3 bottom-0 w-px bg-gray-200"></div>
        
        {/* Timeline items */}
        <div className="relative">
          {activityData.map((act: any, index: number) => (
            <TimelineItem
              key={index}
              title={act.action}
              description={act.details}
              timestamp={`${new Date(act.timestamp).toLocaleDateString('en-US')} - ${new Date(act.timestamp).toLocaleTimeString('en-US', { hour12: true })}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activitypage;
