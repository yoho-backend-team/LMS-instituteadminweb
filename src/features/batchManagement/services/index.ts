import Client from "../../../apis/index"

export const getWithIdBatchService = async (params:any) => {
    try {
      const response = await Client.batch.getWithId(params);
      if (response){
        return response;
      } 
    } catch (error) {
        console.error("Error in getWithIdBatchService:", error);
        return null;
    }
}



export const getCourseService = async (params:any) => {
    try {
      const response = await Client.staff.getCourse(params);
      if (response){
        return response;
      } 
    } catch (error) {
        console.error("Error in getWithIdBatchService:", error);
        return null;
    }
}