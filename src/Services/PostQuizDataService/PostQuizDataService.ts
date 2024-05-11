import { execute } from "../../Config/Database/QueryWrapperMysql";
import { NextFunction, Request, Response } from "express";

interface Option {
    text: string;
    is_correct: boolean;
}

interface QuestionData {
    question_text: string;
    options: Option[];
}

interface Question {
    question: string;
    option: string[];
    correctOption: number;
}

export const PostQuizDataService = {
    PostQuizData: async (request: Request, response: Response, next: NextFunction) => {

        const { course_id, allQuestions }: { course_id: number; allQuestions: { [key: string]: Question } } = request.body;

        try {

            const allquestion: { [key: string]: QuestionData } = {};

            for (const questionKey in allQuestions) {
                if (!allQuestions.hasOwnProperty(questionKey)) continue;

                const { question: questionText, option, correctOption } = allQuestions[questionKey];

                if (option.length < 4) {
                    return response.status(400).json({ msg: "Insufficient options provided for a question" });
                }

                const formattedOptions: Option[] = option.map((opt: string, index: number) => ({
                    text: opt,
                    is_correct: (index + 1) === correctOption
                }));

                const questionDataFormatted: QuestionData = {
                    question_text: questionText,
                    options: formattedOptions
                };

                allquestion[questionKey] = questionDataFormatted;

            }

            const allquestionStringified: string = JSON.stringify(allquestion);
            

            const sql: string = "INSERT INTO questions (course_id, question_text) VALUES (?, ?)";
            await execute(sql, [course_id, allquestionStringified]);

            response.status(200).json({ msg: "Questions inserted successfully" });
        } catch (error) {
            console.error("Failed to insert questions:", error);
            return response.status(500).json({ msg: "Failed to insert questions" });
        }
    }
};


