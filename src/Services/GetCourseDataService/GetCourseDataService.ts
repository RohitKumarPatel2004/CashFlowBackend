import {execute} from "../../Config/Database/QueryWrapperMysql"

export const GetCourseDataService = {
  GetCourseData: async () => {
    try {
      const courses = await execute("SELECT * FROM course_detail ");
  return courses;
    } catch (error: any) {
      console.error('Error fetching Course data:', error.message);
      throw error;
    }
  },
 
};
