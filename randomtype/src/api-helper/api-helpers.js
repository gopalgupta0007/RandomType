import axios from "axios";

export const getUserData = async () => {
    const res = await axios.get("/users/about")
    console.log(res.data.user);
    const data = await res.data;
    return data;
}