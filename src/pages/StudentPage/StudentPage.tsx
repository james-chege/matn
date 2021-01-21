import React, { useState } from "react";
import { Container, Divider, List } from "semantic-ui-react";
import FilterCourseForm from "../../components/FilterCourseForm/FilterCourseForm";
import CourseDetails from "../../components/CourseDetails/CourseDetails";
import { createCourse } from "../../store/actions/course";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import SuccessMessage from '../../components/messages/SuccessMessage';
import { getStudentCourses } from '../../store/actions/student';

export const StudentPage: React.FC = () => {
  const [selectedCourse, setCourse] = useState<any>([]);

  const params = useParams<{id: any, name: string}>();


  const onCourseSelect = (courses: CreateCourseProps) => {
    const newCourses = courses.map((course: any) => ({
      studentId: params.id,
      courseId: course,
    }));
    setCourse(newCourses);
  };

  const addCourse = async (course: CreateCourseProps) => {
    // @ts-ignore
    await mutate(course);
  };

  const { data: resData, mutate, isLoading } = useCreateCourseMutation();

  const { data } = useGetStudentCourse(params.id);

  return (
    <Container>
      {resData && resData.courses ? (
          <SuccessMessage
              header={'Course assigned successfully'}
              content={`Go Back`}
          />
      ) : (
        <>
          <h2>Assign Courses to {params.name}</h2>
          <FilterCourseForm onCourseSelect={onCourseSelect} />
          <Divider />
          {selectedCourse.length ? (
            <CourseDetails submit={addCourse} course={selectedCourse} isLoading={isLoading}/>
          ) : null}
        </>
      )}
      {data?.courses?.length > 0 ? (
          <div className={'user-courses'}>
          <h2>{`${params.name} has the following courses`}</h2>
          {data?.courses?.map(({course}: any)=> (
            <List.Item key={course.id} className={"course-item"}>
              <List.Content>
                <List.Header>{course.name}</List.Header>
              </List.Content>
            </List.Item>
              )
          )}
          </div>
      ) : null}
    </Container>
  );
};

export const useCreateCourseMutation = () => {
  const { mutate, isLoading, data, error } = useMutation(createCourse);
  return { mutate, isLoading, data, error };
};

export const useGetStudentCourse = (id: number) => {
  return useQuery('studentCourses', () => getStudentCourses(id))
}

export default StudentPage;
