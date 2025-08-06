import Client from '../../../apis/index'
import { GetLocalStorage } from '../../../utils/localStorage'

const institute = GetLocalStorage('institute') ?? '973195c0-66ed-47c2-b098-d8989d3e4529'
const institute_id = institute

export const getAllStudents = async (data: any) => {
  const response = await Client.student.class(data)
  if (response) {
    return response;
  }
};

export const getAllPlacements = async (data:any)=>{
  try{
    const Data = {...data, institute_id }
    const response = await Client.placements.getAll(Data)
    return response
  }catch (error: any) {
        throw new Error(error.message)
  }
}

export const getPlacementsByID = async (params:any)=>{
  try{
    const data = {...params, institute_id}
    const response = await Client.placements.getById(data)
    return response
  }catch(error: any){
     throw new Error(error.message)
  }
}

export const createPlacement = async (data: any) => {
  try {
    const Data = {...data, institute:institute_id }
    const response = await Client.placements.create(Data)
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};