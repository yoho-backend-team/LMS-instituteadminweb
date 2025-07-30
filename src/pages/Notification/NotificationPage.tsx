import React from 'react';

const NotificationsPage: React.FC = () => {
    const notifications = [
        {
            id: 1,
            title: 'Branch Management',
            date: '05 nov 2022',
            time: '10:32 am',
        },
        {
            id: 2,
            title: 'Student Management',
            date: '20 aug 2025',
            time: '05:34 pm',
        },
        {
            id: 3,
            title: 'Content Management',
            date: '17 mar 2025',
            time: '06:09 pm',
        },
    ];

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">All Notifications</h2>
            <ul className="bg-white rounded-md shadow divide-y">
                {notifications.map((item) => (
                    <li key={item.id} className="p-4 hover:bg-gray-50">
                        <p className="font-medium text-gray-800">{item.title}</p>
                        <p className="text-sm text-gray-500">
                            {item.date} at {item.time}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationsPage;
