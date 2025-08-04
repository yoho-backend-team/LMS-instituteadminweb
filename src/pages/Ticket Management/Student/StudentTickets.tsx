import React from 'react';
import StudTickets from '../../../components/StudentTickets/StudTickets'
import { TicketProvider } from '../../../components/StudentTickets/TicketContext';

const StudentTickets = () => {
  return (
    <div className="p-4">
			<TicketProvider>
				<StudTickets />
			</TicketProvider>
    </div>
  );
};
export default StudentTickets;
