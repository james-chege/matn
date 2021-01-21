import api from "../../utils/api.util"

export const getCourse = async (id: number) => {
    const endpoint = `/api/course/getCourses/${id}`
    const { data } = await api.get<any>(endpoint)
    return data;
}

export const getCourses = async () => {
    const endpoint = `/api/course/getCourses`
    const { data } = await api.get<any>(endpoint)
    return data;
}

export const createCourse = async (
    values: Array<{ courseId: number; studentId: number; }>
) => {
    const endpoint = "/api/student/addCourse";
    const { data } = await api.post(endpoint, {
        courses: values
    });
    return data;
};
