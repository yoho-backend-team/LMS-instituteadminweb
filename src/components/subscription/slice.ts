// store/features/subscription/slice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type PlanType = {
  id: number;
  name: string;
  description: string;
  price: number;
  features: string[];
};

interface SubscriptionState {
  plans: PlanType[];
  insitituteSubscription: any | null;
  status: any;
  upgradeResponse: any | null;
}

const initialState: SubscriptionState = {
  plans: [],
  insitituteSubscription: null,
  status: null,
  upgradeResponse: null
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setAllPlan: (state, action: PayloadAction<PlanType[]>) => {
      state.plans = action.payload;
    },
    setInstituteSubscription: (state, action: PayloadAction<any>) => {
      state.insitituteSubscription = action.payload;
    },
    setSubscriptionStatus: (state, action: PayloadAction<any>) => {
      state.status = action.payload
    },
    setUpgradeResponse: (state, action: PayloadAction<any>) => {
      state.upgradeResponse = action.payload;
    }
  },
});

export const { setAllPlan, setInstituteSubscription, setSubscriptionStatus,setUpgradeResponse } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
