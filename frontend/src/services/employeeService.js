import api from "../api/axios";
import { API } from "../config/apiConfig";

const EmployeeService = {

    getAllEmployees() {
        return api.get(`${API.EMPLOYEE}/employees`);
    },

    getEmployeeById(id) {
        return api.get(`${API.EMPLOYEE}/employees/${id}`);
    },

    createEmployee(employee) {
        return api.post(`${API.EMPLOYEE}/employees`, employee);
    },

    updateEmployee(id, employee) {
        return api.put(`${API.EMPLOYEE}/employees/${id}`, employee);
    },

    deleteEmployee(id) {
        return api.delete(`${API.EMPLOYEE}/employees/${id}`);
    },

    getEmployees(
        page = 0,
        size = 10,
        sortBy = "id",
        sortDir = "asc",
        search = ""
    ) {
        return api.get(`${API.EMPLOYEE}/employees/page`, {
            params: {
                page,
                size,
                sortBy,
                sortDir,
                search
            }
        });
    }

};

export default EmployeeService;