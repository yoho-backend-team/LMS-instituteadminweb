import { getAddQuestionAll } from "./service";
import { getAddQuestion } from "./slice";

export const fetchAddQuestionThunk = (params: any) => async (dispatch: any) => {
  try {
    const response = await getAddQuestionAll(params);
    dispatch(getAddQuestion(response.data.data));

  } catch (error) {
    console.error("Failed to fetch study materials:", error);
  }
};
