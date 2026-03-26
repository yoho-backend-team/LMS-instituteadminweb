export const BackendURL = import.meta.env.VITE_PUBLIC_API_URL;

export const GetImageUrl = (url: string | null) => {
    const data = url ? BackendURL + '/' + url : null;
    return data;
};