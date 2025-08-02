import Client from '../../apis/index'


export const getStudyMaterialsAll = async (params:any) => {
    try {
       
        const response = await Client.study_material.getAll(params)
        console.log("Backend data comming",response)
        return response
    } catch (error: any) {
        throw new Error(error.message)
    }
}


export const createStudyMaterial = async (data: any) => {
  try {
    const response = await Client.study_material.create(data)
    console.log("Created Study Material:", response)
    return response
  } catch (error) {
    console.error("Error in createStudyMaterial:", error)
    throw error
  }
}

export const updateStudyMaterial = async (data: any, id: string) => {
  try {
    const response = await  Client.study_material.update(data, id)
    console.log("Updated Study Material:", response)
    return response
  } catch (error) {
    console.error("Error in updateStudyMaterial:", error)
    throw error
  }
}

export const deleteStudyMaterial = async (id: string) => {
  try {
    const response = await  Client.study_material.delete(id)
    console.log("Deleted Study Material:", response)
    return response
  } catch (error) {
    console.error("Error in deleteStudyMaterial:", error)
    throw error
  }
}

export const updateStudyMaterialStatus = async (data: { id: string; status: string }) => {
  try {
    const response = await  Client.study_material.update_status(data)
    console.log("Updated Study Material Status:", response)
    return response
  } catch (error) {
    console.error("Error in updateStudyMaterialStatus:", error)
    throw error
  }
}
