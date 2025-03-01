import { generateBotResponse } from "../services/chatbot.service.js";
import Assessment from "../models/assessment.model.js";
import { askAssessmentService } from "../services/chatbot.service.js";



const getBotResponse = async (req, res) => {
    try {
        const response = await generateBotResponse();
        res.status(200).json({ response });
    } catch (error) {
        console.error('Error in chatbot response:', error);
        res.status(500).json({
            message: 'Error generating response'
        });
    }
};

const askAssessment = async (req, res) => {
    try {
        const { assessmentId } = req.params;
        const { question } = req.body;
        // extract transcript from assessment model
        const assessment = await Assessment.findById(assessmentId);
        const transcript = assessment.transcript;
        // give transcript and question to chatbot
        const response = await askAssessmentService(transcript, question);

        res.status(200).json({
            response,
            status: 200,
            success: true
        });


    } catch (error) {
        console.error('Error in generating assessment:', error);
        res.status(500).json({
            message: 'Error generating assessment'
        });
    }
};


const generateAssessment = async (req, res) => {
    try {
        const assessment = await generateBotResponse();
        res.status(200).json({ assessment });
    } catch (error) {
        console.error('Error in generating assessment:', error);
        res.status(500).json({
            message: 'Error generating assessment'
        });
    }
};


export { getBotResponse, generateAssessment, askAssessment };

