import userAuthenticatedAxiosInstance from "../users/userAuthenticatedAxiosInstance";

const userAxiosInstance1 = userAuthenticatedAxiosInstance(
    "/api/v1/assessmentGenerate"
);
const userAxiosInstance2 = userAuthenticatedAxiosInstance(
    "/api/v1/assessmentResult"
);const userAxiosInstance3 = userAuthenticatedAxiosInstance(
    "/api/v1/chatbot"
);

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const generateQuizFromYoutube = async (
    videoUrl,
    numberOfQuestions = 5,
    difficulty = "medium",
    type = "MCQ"
) => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await userAxiosInstance1.post(
            "/youtube",
            {
                videoUrl,
                numberOfQuestions,
                difficulty,
                type,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error generating quiz:", error);
        throw error;
    }
};

const generateQuizFromMedia = async (
    file,
    numberOfQuestions = 5,
    difficulty = "medium",
    type = "MCQ"
) => {
    const formData = new FormData();
    formData.append("media", file);
    formData.append("numberOfQuestions", numberOfQuestions);
    formData.append("difficulty", difficulty);
    formData.append("type", type);

    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await userAxiosInstance1.post("/media", formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error generating quiz:", error);
        throw error;
    }
};

const generateQuizFromDocument = async (
    file,
    numberOfQuestions = 5,
    difficulty = "medium",
    type = "MCQ"
) => {
    const formData = new FormData();
    formData.append("document", file);
    formData.append("numberOfQuestions", numberOfQuestions);
    formData.append("difficulty", difficulty);
    formData.append("type", type);

    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await userAxiosInstance1.post("/document", formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error generating quiz:", error);
        throw error;
    }
};

const submitQuiz = async (assessmentId, submissionBody) => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await userAxiosInstance2.post(
            `/submit/${assessmentId}`,
            submissionBody,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error submitting quiz:", error);
        throw error;
    }
};

const fetchQuizData = async (assessmentId) => { //result of quiz 
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await userAxiosInstance2.get(
            `/getResult/${assessmentId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching quiz data:", error);
        throw error;
    }
};

const askAssessment = async (assessmentId, question) => {
    try {
        const reference = await fetchQuizData(assessmentId);
        console.log(reference.result);
        const accessToken = localStorage.getItem("accessToken");
        const response = await userAxiosInstance3.post(
            `/ask-assessment/${assessmentId}`,
            {
                reference,
                question,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error asking assessment:", error);
        throw error;
    }
};

export {
    generateQuizFromYoutube,
    generateQuizFromMedia,
    generateQuizFromDocument,
    submitQuiz,
    fetchQuizData,
    askAssessment,
};
