import axios from 'axios';

export const fetchData = async () => {
    try {
        const response = await axios.get("/users/about", { headers: { "Content-Type": "application/json" }, withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};