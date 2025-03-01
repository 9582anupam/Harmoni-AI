import userAuthenticatedAxiosInstance from "../users/userAuthenticatedAxiosInstance";

const userAxiosInstance1 = userAuthenticatedAxiosInstance(
    "/api/v1/assessmentGenerate"
);
const userAxiosInstance2 = userAuthenticatedAxiosInstance(
    "/api/v1/assessmentResult"
);

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const generateQuizFromYoutube = async (
    videoUrl,
    numberOfQuestions = 5,
    difficulty = "medium",
    type = "MCQ"
) => {
    // return fetch(`${REACT_APP_BACKEND_URL}/api/v1/assessmentGenerate/youtube`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ videoUrl, numberOfQuestions, difficulty, type })
    // })
    // .then(response => {
    //     if (!response.ok) {
    //         throw new Error('Failed to generate quiz');
    //     }
    //     return response.json();
    // })
    // .catch(error => {
    //     console.error('Error generating quiz:', error);
    //     throw error;
    // });
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

    // return fetch(`${REACT_APP_BACKEND_URL}/api/v1/assessmentGenerate/media`, {
    //     method: "POST",
    //     body: formData,
    // })
    //     .then((response) => {
    //         if (!response.ok) {
    //             throw new Error("Failed to generate quiz");
    //         }
    //         return response.json();
    //     })
    //     .catch((error) => {
    //         console.error("Error generating quiz:", error);
    //         throw error;
    //     });

    // use axios instance and pass accessToken from localstorage in auth header
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

    // return fetch(`${REACT_APP_BACKEND_URL}/api/v1/assessmentGenerate/document`, {
    //     method: "POST",
    //     body: formData,
    // })
    //     .then((response) => {
    //         if (!response.ok) {
    //             throw new Error("Failed to generate quiz");
    //         }
    //         return response.json();
    //     })
    //     .catch((error) => {
    //         console.error("Error generating quiz:", error);
    //         throw error;
    //     });
    // use axios instance and pass accessToken from localstorage in auth header
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

// submit response

const submitQuiz = async (assessmentId, submissionBody) => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken);
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

        // const response = await userAxiosInstance2.post(
        //   `/submit/${assessmentId}`,
        //   submissionBody,
        //   {
        //     withCredentials: true,
        //   }

        // );
        return response.data;
    } catch (error) {
        console.error("Error submitting quiz:", error);
        throw error;
    }
};

// fetchQuizData
// const fetchQuizData = async () => {
//     try {
//         const accessToken = localStorage.getItem('accessToken');
//         const response = await axios.get(`${REACT_APP_BACKEND_URL}/api/v1/assessmentResult/getResult/${assessmentId}`, {}, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`
//             },
//             withCredentials: true
//         });
//         setQuizData(response.data.assessment)
//     } catch (error) {
//         console.error('Error fetching quiz data:', error)
//     }
// }

const fetchQuizData = async (assessmentId) => {
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
        // console.log("response my", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching quiz data:", error);
        throw error;
    }
};

export {
    generateQuizFromYoutube,
    generateQuizFromMedia,
    generateQuizFromDocument,
    submitQuiz,
    fetchQuizData,
};
