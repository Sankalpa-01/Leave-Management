import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    const token = JSON.parse(localStorage.getItem("user")).token;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const logoutUser = () => API.post("/auth/logout");

export const addEmployee = (data) => API.post("/employees/add-employee", data);
export const getLeaveBalance = (id) =>
  API.get(`/employees/${id}/leave-balance`);

export const getEmployees = () => API.get("/employees/all-employee");

export const applyLeave = (data) => API.post("/leaves", data);
export const updateLeaveStatus = (id, data) => API.put(`/leaves/${id}`, data);

export const getAllLeaves = () => API.get("/leaves/all-leaves");
export const getEmployeeLeaves = (id) => API.get(`/leaves/employee/${id}`);

export default API;
