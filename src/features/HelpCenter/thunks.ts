/* eslint-disable @typescript-eslint/no-explicit-any */
import { getFaqQuestionsAll } from "./service";
import { setFaqItems } from "./slice";

export const fetchHelpCenterThunk = (params: any) => async (dispatch: any) => {
  try {

    const response = await getFaqQuestionsAll(params);
    dispatch(setFaqItems(response));
  } catch (error: any) {

    console.error("Failed to fetch Help Center data:", error);
  }
};