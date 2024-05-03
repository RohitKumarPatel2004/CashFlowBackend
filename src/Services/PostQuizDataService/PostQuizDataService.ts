import { execute } from "../../Config/Database/QueryWrapperMysql";
import { NextFunction, Request, Response } from "express";

interface Question {
    question: string;
    option: string[];
    correctOption: number;
}

export const PostQuizDataService = {
    PostQuizData: async (request: Request, response: Response, next: NextFunction) => {
        const { course_id, questions }: { course_id: number; questions: Question[] } = request.body;

        try {
            if (!Array.isArray(questions) || questions.length === 0) {
                return response.status(400).json({ msg: "No questions provided" });
            }

            const values: any = [];

            for (const question of questions) {
                const { question: questionText, option, correctOption } = question;

                if (option.length < 4) {
                    return response.status(400).json({ msg: "Insufficient options provided for a question" });
                }

                const formattedOptions = option.map((opt, index) => ({
                    text: opt,
                    is_correct: (index + 1) === correctOption
                }));

                const questionData = {
                    question_text: questionText,
                    options: formattedOptions
                };

                const serializedQuestion = JSON.stringify(questionData);
                values.push(serializedQuestion);
            }

            const sql = "INSERT INTO questions (course_id, question_text) VALUES (?, JSON_OBJECT('question_text', ?))";
            await execute(sql, [course_id, values]);

            response.status(200).json({ msg: "Questions inserted successfully" });
        } catch (error) {
            console.error("Failed to insert questions:", error);
            return response.status(500).json({ msg: "Failed to insert questions" });
        }
    }
};
