/* eslint-disable @typescript-eslint/no-explicit-any */
// store/slices/timelineThunks.ts

import { getTimeline } from "../services";
import { gettimeline } from "./timelineSlice";


// Async thunk for fetching timeline
export const fetchTimeline = (params: any) => async (dispatch: any) => {
  try {
    const response = await getTimeline(params);
    if (response) dispatch(gettimeline(response.data))
  } catch (error: any) {
    console.log(error)
  }
}

