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

export const getUserById = async (data:any) => {
  try {
    const response = await Client.user.getWithId(data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    throw new Error(`Failed to fetch users`);
  }
};

export const updateUserStatus = async (data:any) => {
  try {
    const response = Client.user.update(data);
    return { success: true, message: 'User status updated successfully' };
  } catch (error) {
    console.error('Error in addUser:', error);
    return { success: false, message: error };
  }
};

export const updateUser = async (data:any) => {
  try {
    const response = await Client.user.update(data);
    return { success: true, message: 'User updated successfully' };
  } catch (error) {
    console.error('Error in editUser:', error);
    return { success: false, message: error };
  }
};

export const deleteUsers = async (userId:string) => {
  try {
    const response = await Client?.user?.delete({ userId: userId });
    return { success: true, message: 'User deleted successfully' };
  } catch (error) {
    console.error('Error in deleteUser:', error);
    return { success: false, message: 'Failed to delete group' };
  }
};