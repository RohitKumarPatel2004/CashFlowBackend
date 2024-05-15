import { execute } from "../../Config/Database/QueryWrapperMysql";
import { HttpException } from "../../Exceptions/Http_Exception";

export const GetCourseDataByIdService = {
  GetCourseDataById: async (Id: any) => {
    try {
      const course = await execute("SELECT * FROM course_detail WHERE id = ?", [Id]) as any[];
      
      if (!course || course.length === 0) {
        throw new HttpException(404, "Course not found");
      }
      return course
    } catch (error:any) {
      console.error('Error fetching Course data by ID:', error.message);
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(500, "Internal server error");
      }
    }
  }
};
