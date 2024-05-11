import { execute } from "../../Config/Database/QueryWrapperMysql";
import { Request, Response } from "express";

export const GetQuizDataService = {
    GetQuizData: async (request: Request, response: Response) => {
        try {
            const { course_id } = request.body;
            const sql = "SELECT * FROM questions WHERE course_id=?";
            const result: any = await execute(sql, [course_id]);

            if (result.length > 0) {
                const questions: { [key: string]: any } = {};

                result.forEach((question: any) => {
                    const questionData = JSON.parse(question.question_text);
                    const keys = Object.keys(questionData);

                    keys.forEach((key: string) => {
                        const questionKey = key;
                        const questionItem = questionData[key];


                        questions[questionKey] = {
                            question: questionItem.question_text,
                            option: questionItem.options.map((opt: any) => opt.text),
                            correctOption:questionItem.options.findIndex((opt: any) => opt.is_correct === true)
                        };
                    });
                });

                const output = {
                    course_id: course_id,
                    questions: questions
                };

                response.status(200).json(output);
            } else {
                response.status(200).json({ msg: "Data not Found" });
            }
        } catch (error) {
            response.status(500).json({ msg: "Something went wrong" });
        }
    }
};
