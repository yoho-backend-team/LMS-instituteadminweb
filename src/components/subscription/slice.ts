// store/features/subscription/slice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

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
	upgradeRequest: any | null;
	loading: boolean;
}

const initialState: SubscriptionState = {
	plans: [],
	insitituteSubscription: null,
	status: null,
	upgradeRequest: null,
	loading: false,
};

const subscriptionSlice = createSlice({
	name: 'subscription',
	initialState,
	reducers: {
		setAllPlan: (state, action: PayloadAction<PlanType[]>) => {
			state.plans = action.payload;
		},
		setInstituteSubscription: (state, action: PayloadAction<any>) => {
			state.insitituteSubscription = action.payload;
		},
		setSubscriptionStatus: (state, action: PayloadAction<any>) => {
			state.status = action.payload;
		},
		setUpgradeRequest: (state, action: PayloadAction<any>) => {
			state.upgradeRequest = action.payload;
		},
		setLoading: (state, action: PayloadAction<any>) => {
			state.loading = action.payload;
		},
	},
});

export const {
	setAllPlan,
	setInstituteSubscription,
	setSubscriptionStatus,
	setUpgradeRequest,
	setLoading,
} = subscriptionSlice.actions;
export default subscriptionSlice.reducer;

export const selectLoading = (state: any) => state.subscription.loading;
