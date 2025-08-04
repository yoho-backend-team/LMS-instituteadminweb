
import { getStudyMaterialsAll } from "./service"; 
import { getStudyMaterial } from "./slice";


export const fetchStudyMaterialsThunk = (params:any) => async (dispatch: any) => {
  try {
    const response = await getStudyMaterialsAll(params);
    dispatch(getStudyMaterial(response.data.data));
        console.log(" fetch study materials:",response.data.data);

  } catch (error) {
    console.error("Failed to fetch study materials:", error);
  }
};

