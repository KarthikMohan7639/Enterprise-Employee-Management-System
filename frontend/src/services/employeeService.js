import api from "../api/axios";

const EmployeeService = {

    getAllEmployees() {
        return api.get("/employees");
    },

    getEmployeeById(id) {
        return api.get(`/employees/${id}`);
    },

    createEmployee(employee) {
        return api.post("/employees", employee);
    },

    updateEmployee(id, employee) {
        return api.put(`/employees/${id}`, employee);
    },

    deleteEmployee(id) {
        return api.delete(`/employees/${id}`);
    },

    getEmployees(
        page = 0,
        size = 10,
        sortBy = "id",
        sortDir = "asc",
        search = ""
    ) {
        return api.get("/employees/page", {
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