import Client from '../../../apis/index'

export const getCertificate = async (params:any)=>{
    const response = await Client.certificate.getAll(params)
     if(response){
    return response
   }
}


export const updateCertificate = async (params:any)=>{
try{
    const response = await Client.certificate.update(params)
    if(response){
        return response 
    }
}
catch(error){
    console.log(error)
    return null;
}

}

export const deleteCertificate = async (data:any)=>{
    try{
    const response = await Client.certificate.delete(data)
    
   if(response){
        return response 
    }
}
catch(error){
    console.log(error)
    return null;
}
}

export const createCertificate = async (data:any)=>{
    try{
        const response = await Client.certificate.create(data)
   if(response){
        return response 
    }
}
catch(error){
    console.log(error)
    return null;
}
}


export const getCourseService = async (params: any) => {
    try {
        const response = await Client.staff.getCourse(params);
        if (response) {
            return response;
        }
    } catch (error) {
        console.error('Error in getcourseService:', error);
        return null;
    }
};

export const getBranchService = async (params: any) => {
    try {
        const response = await Client.branch.getAll(params);
        if (response) {
            return response;
        }
    } catch (error) {
        console.error('Error in getbranchService:', error);
        return null;
    }
};

export const getAllBatches = async (params: any) => {
    try {
        const response = await Client.batch.getWithId(params);
        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getStudentService = async (params: any) => {
	try {
		const response = await Client.student.getall(params);
		if (response) {
			return response;
		}
	} catch (error) {
		console.error('Error in getstudentService:', error);
		return null;
	}
};

