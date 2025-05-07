import axios from "axios";

export const handleregister = (e, formData) => async (action) => {
    try {
        e.preventDefault();
        action({ type: "API_REQUEST" });

        const res = await axios.post('https://localhost:7023/api/User/Register', formData);

        if (res.status === 200) {
            action({
                type: "API_SUCCESS",
                payload: res.data,
                message: res.data.message,
            });
        }
    } catch (err) {
        console.log(err);
        action({
            type: "API_FAILURE",
            error: err,
            message: err.message,
        });
    }
};
