import { axiosInstance } from "../axiosInstance";

export const apiPost = (requestType, url, formData, e, Id) => async (action) => {
    try {

        if (e) {
            e.preventDefault();
        }
        action({ type: "API_REQUEST" });

        let res;
        if (requestType == 'POST') {
            res = await axiosInstance.post(url, formData);
        }

        if (res.status === 200) {
            const { data } = res;
            
            // Store token in localStorage if it exists in the response
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
        }
        
        else if (requestType == 'PUT' && Id !== undefined) {
            res = await axiosInstance.put(`${url}/${Id}`, formData);
        }
        else {
            throw new Error("Invalid request type or missing ID for PUT");
        }

        if (res.status === 200) {
            action({
                type: "API_SUCCESS",
                payload: res.data,
                message: res.data.message,
                username: res.data.name,
                email: res.data.email,
            });
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        action({
            type: "API_FAILURE",
            error: error,
            message: error?.response?.data?.message || "Request failed",

        });
        return false;
    }

}