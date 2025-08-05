import Client from "../../../../apis/index"

export const getAllUsers = async(data:any) => {
    try {
        const response = await Client.user.getAll(data)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const addUser = async (data:any) => {
  try {
    const response = await Client.user.add(data);
    return { success: true, message: 'User created successfully' };
  } catch (error) {
    console.error('Error in addUser:', error);
    return { success: false, message: 'User created failed' };
  }
};