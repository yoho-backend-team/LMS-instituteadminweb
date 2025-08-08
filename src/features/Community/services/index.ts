import Client from '../../../apis/index';


export const getCommunity = async (params: any) => {
  try {
    const response = await Client.community.getAll(params);
    if (response) {
      return response;
    }
  } catch (error) {
    console.error("Community fetch error:", error);
    return null;
  }
};


export const getMessage = async (params: any) => {
  try {
    const response = await Client.community.getMessages(params);
    if (response) {
      return response;
    }
  } catch (error) {
    console.error("Message fetch error:", error);
    return null;
  }
};


// export const getMessages = async (params: any) => {
//   try {
//     const response = await Client.community.getMessages(params);
//     if (response) {
//       return response;
//     }
//   } catch (error) {
//     console.error("All Messages fetch error:", error);
//     return null;
//   }
// };


export const getCommunityMessage = async (params: any) => {
    try {
        const response = await Client.community.getCommunityMessage(params);
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("Error fetching community message:", error);
        return null;
    }
}
