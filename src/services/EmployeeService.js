import axios from "axios";
//http://localhost:8091/api/employees
// /http://13.201.125.13:8091
const REST_API_BASE_URL = "http://13.201.125.13:8091/api/employees";

export const listEmployees = () => {
  return axios.get(REST_API_BASE_URL);
};

export const createEmployee = (employee) => {
  return axios.post(REST_API_BASE_URL, employee);
};

export const getEmployeeById = (employeeId) => {
  return axios.get(`${REST_API_BASE_URL}/${employeeId}`);
};

export const updateEmployee = (employeeId, employee) => {
  return axios.put(`${REST_API_BASE_URL}/${employeeId}`, employee);
};

export const deleteEmployee = (employeeId) => {
  return axios.delete(`${REST_API_BASE_URL}/${employeeId}`);
};
