import { createPlacement, getAllPlacements, getAllStudents, getPlacementsByID } from "../Services/Placement"
import { addPlacement, setAllPlacements, setPlacementById, setStudents } from "./slice"


export const getStudentsThunk =
    (params: any) => async (dispatch: any) => {
        try {
            const response = await getAllStudents(params);
            dispatch(setStudents(response));
            console.log('Students fetched successfully! :', response)
        } catch (error) {
            console.log(error);
        }
    };

export const getAllPlacemetsThunk = (data: any) => async (dispatch: any) => {
  try {
    const response = await getAllPlacements(data)
    dispatch(setAllPlacements(response.data))
    console.log('Placements fetched successfully! :', response?.data)
  } catch (error) {
    console.log(error)
  }
}
export const getPlacementByIdThunk = (params: any) => async (dispatch: any) =>{
    try{
        const response = await getPlacementsByID(params);
        dispatch(setPlacementById(response.data));
        console.log('PlacementById fetched successfully! :',response.data)
    }catch(error) {
        console.log(error)
    }
}

export const createPlacementThunk = (data: any) => async (dispatch: any) => {
  try {
    const response = await createPlacement(data);
    dispatch(addPlacement(response.data)); 
  } catch (error) {
    console.error("Error creating placement:", error);
    throw error;
  }
};