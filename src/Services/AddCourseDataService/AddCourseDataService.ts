import { Request, Response } from 'express';
import { execute } from "../../Config/Database/QueryWrapperMysql";
import * as yup from 'yup';

// Define Yup schema for validation
const courseSchema = yup.object().shape({
  title: yup.string().required(),
  duration: yup.string().required(),
  instructor: yup.string().required(),
  courseDescription: yup.string().required(),
  courseLevel: yup.string().required(),
  courseType: yup.string().required(),
  fees: yup.number().required(),
  launchDate: yup.date().required(),
});

export const AddCourseDataService = {
  AddCourseData: async (request: Request, response: Response) => {
    try {
    const { title, duration, instructor, courseDescription, courseLevel, courseType, fees, launchDate } = request.body;

      // Validate request body against schema
      await courseSchema.validate({
        title,
        duration,
        instructor,
        courseDescription,
        courseLevel,
        courseType,
        fees, 
        launchDate 
      });

      const createCourseQuery = 'INSERT INTO course_detail (title, duration, instructor, course_description, course_level, course_type, fees, launch_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      await execute(createCourseQuery, [title, duration, instructor, courseDescription, courseLevel, courseType, fees, launchDate ]);
     
      response.status(200).json({
    "Success": 'true',
    "result": "Succeeded",
    "data": {message: 'Course added successfully'}
      });
    } catch (error: any) {
      console.error('Error fetching Course data:', error.message);
      response.status(400).json({
    "Success": 'false',
    "result": "Failure",
    "data": {message:error.message}
      });
    }
  },
};
