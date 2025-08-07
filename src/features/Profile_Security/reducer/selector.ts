

export const selectTimeline = (state:any) => state.timelineReducer.data;
export const selectTimelineLoading = (state:any) => state.timelineReducer.loading;
export const selectTimelineError = (state:any) => state.timelineReducer.error;
