interface CreateCourseProps {
  courses: Array<{
    studentId: number;
    courseId: number;
  }>

  // map(param: (course: any) => {studentId: number; courseId: any}): void;
  map(param: (course: any) => { studentId: string; courseId: any }): void;
}

interface Course {
  name: string;
  description: string;
  id: number;
}
