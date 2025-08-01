import Client from '../../../../apis/index';


export const getNotes = async (params: any) => {
  const response=await Client.notes.get(params)
  return  response

};
export const createNote = async (data: any) => {
  return await Client.notes.create(data);
};

export const updateNote = async (data: any) => {
  return await Client.notes.update(data); 
};

export const deleteNote = async (id: string) => {
  return await Client.notes.delete({ id });
};


//  notes = {
    //     get: (params: string) => HttpClient.get(HTTP_END_POINTS.notes.index, params),
    //     create: (data: any) => HttpClient.post(HTTP_END_POINTS.notes.index, data),
    //     update: (data: any) => HttpClient.update(HTTP_END_POINTS.notes.index + `/update/${data.uuid}`, data),
    //     update_status: (data: any) => HttpClient.update(HTTP_END_POINTS.notes.update_status + data.id, data),
    //     delete: (data: any) => HttpClient.delete(HTTP_END_POINTS.notes.index + '/' + data.id)
    // };