import api from '../../utils/api.util';

export const getStudents = async () => {
    const endpoint = `/api/student`;
    const {data} = await api.get(endpoint);
    return data;
}

export const getStudentCourses = async (studentId: number) => {
    const endpoint = `/api/student/courses/${studentId}`;
    const { data } = await api.get(endpoint);
    return data;
}
