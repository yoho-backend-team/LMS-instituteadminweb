import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Placement = {
  _id: string;
  studentName: string;
  email: string;
  companyName: string;
  companyAddress: string;
  contactEmail: string;
  contactNumber: string;
  interviewDate: string;
  jobName: string;
  jobDescription: string;
  skills: string[];
  venue: string;
  address: string;
  courseName: string;
  education: string;
};

interface PlacementState {
  placements: Placement[];
  placementById: Placement | null;
  students: any[];
}

const initialState: PlacementState = {
  placements: [],
  placementById: null,
  students: [],
};

const placementsSlice = createSlice({
  name: "placements",
  initialState,
  reducers: {
    setAllPlacements: (state, action: PayloadAction<Placement[]>) => {
      state.placements = action.payload;
    },
    setPlacementById: (state, action: PayloadAction<Placement>) => {
      state.placementById = action.payload;
    },
    setStudents: (state, action: PayloadAction<any[]>) => {
      state.students = action.payload;
    },
    addPlacement: (state, action: PayloadAction<Placement>) => {
      state.placements.push(action.payload);
    },
  },
});

export const { setAllPlacements, setPlacementById, setStudents,addPlacement } = placementsSlice.actions;
export default placementsSlice.reducer;
