import { getcoursedata, getstudentnotificationdata } from "../services/Notification";
import { getcoursedetails, getstudentnotificationdetails } from "./NotificationSlice";

export const getStudentnotification =
    (params: any) => async (dispatch: any) => {
        try {
            const response = await getstudentnotificationdata(params);
            dispatch(getstudentnotificationdetails(response));
        } catch (error) {
            console.log(error);
        }
    };

    export const getcourse =
  (data: any) => async (dispatch: any) => {
    try {
      const response = await getcoursedata(data);
      console.log("Thunk response:", response); // ✅ already confirmed
      dispatch(getcoursedetails(response)); // <--- CHECK THIS
    } catch (error) {
      console.log(error);
    }
  };
