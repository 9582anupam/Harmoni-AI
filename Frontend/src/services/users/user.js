import userAuthenticatedAxiosInstance from './userAuthenticatedAxiosInstance';
const userAxiosInstance = userAuthenticatedAxiosInstance('/api/v1/users');

export const getUserProfile = async () => {
    try {
        const response = await userAxiosInstance.get('/getme');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUserProfile = async (userData) => {
    try {
        const response = await userAxiosInstance.post('/putdata', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};



export const getLeaderboard = async () => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await userAxiosInstance.get(
            `/leaderboard`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        throw error;
    }
};