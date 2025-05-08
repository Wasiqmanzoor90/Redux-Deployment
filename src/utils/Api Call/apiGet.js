import { axiosInstance } from "../axiosInstance";

export const apiGet = (url, id) = async (action)=>
    {

        try {
            

            action({ type: "API_REQUEST" });
            const endpoint = id !== undefined ? `${url}/${id}` : url;
            const res = await axiosInstance(endpoint);
            if(res.status === 200)
            {
                action({
                    type: "API_SUCCESS",
                    payload: res.data.payload,
                    message: res.data.message,
                    username: res.data.name,
                    email: res.data.email,
                });
                return true;
            }
            return false;
        } catch (error) {
            console.error(error);
            action({
              type: "API_FAILURE",
              error: error,
              message: err?.response?.data?.message || "Request failed",
            });
            return false;
        }
    }