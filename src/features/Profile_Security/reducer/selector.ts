import type { RootState } from "../../../store/store";


export const selectTimeline = (state: RootState) => state.timelineReducer.data;
export const selectTimelineLoading = (state: RootState) => state.timelineReducer.loading;
export const selectTimelineError = (state: RootState) => state.timelineReducer.error;
