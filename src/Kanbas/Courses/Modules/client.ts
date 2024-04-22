import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = "http://localhost:4000/api/courses";
//const COURSES_API = `${API_BASE}/api/courses`;
const MODULES_API = `${API_BASE}/api/modules`;

export const deleteModule = async (moduleId: any) => {
  const response = await axios
    .delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};

export const createModule = async (courseId: any, module: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const findModulesForCourse = async (courseId: any) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const updateModule = async (module: { _id: any; }) => {
  const response = await axios.
    put(`${MODULES_API}/${module._id}`, module);
  return response.data;
};

export const findCourses = async () => {
  console.log(COURSES_API.toString())
  const response = await axios
    .get(`${COURSES_API}/`);
    console.log("resp")
    console.log(response)
  return response.data;
};

export const findCourseById = async (courseId?: string) => {
  console.log("couseId")
  console.log(courseId)
  const response = await axios.get(
    `${COURSES_API}/${courseId}`
  );
  console.log(response)
  return response.data;
};