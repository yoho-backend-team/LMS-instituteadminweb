/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AttendanceRecord {
    _id?: string;
    date: string;
    institute?: string;
    branch?: string;
    status: 'present' | 'absent';
    staff: string;
    is_active?: boolean;
    is_delete?: boolean;
    uuid?: string;
    id?: number;
    __v?: number;
    [key: string]: any;
}

interface StaffAttendanceState {
    data: AttendanceRecord[];
    selectStaff: any;
    attendance: AttendanceRecord[];
}

const initialState: StaffAttendanceState = {
    data: [],
    selectStaff: {},
    attendance: [],
};

const staffAttendance = createSlice({
    name: 'staffAttendance',
    initialState,
    reducers: {
        setStaffAttendance: (state, action: PayloadAction<AttendanceRecord[]>) => {
            state.data = action.payload;
        },
        setSelectStaff: (state, action: PayloadAction<any>) => {
            state.selectStaff = action.payload;
        },
        setSelectStaffAttendance: (
            state,
            action: PayloadAction<{ data: AttendanceRecord[] }>
        ) => {
            state.attendance = action.payload.data;
        },
        setSelectStaffAttendanceUpdate: (
            state,
            action: PayloadAction<AttendanceRecord>
        ) => {
            const data = action.payload;

            const existIndex = state.attendance.findIndex(
                (record) => record.staff === data.staff && record.date === data.date
            );

            if (existIndex !== -1) {
                state.attendance[existIndex] = data;
            } else {
                state.attendance.push(data);
            }
        },
    },
});

export const {
    setStaffAttendance,
    setSelectStaff,
    setSelectStaffAttendance,
    setSelectStaffAttendanceUpdate,
} = staffAttendance.actions;

export default staffAttendance.reducer;
