import api from "../api/axios";

const DepartmentService = {

    getAllDepartments() {
        return api.get("/departments");
    },

    getDepartmentById(id) {
        return api.get(`/departments/${id}`);
    },

    createDepartment(department) {
        return api.post("/departments", department);
    },

    updateDepartment(id, department) {
        return api.put(`/departments/${id}`, department);
    },

    deleteDepartment(id) {
        return api.delete(`/departments/${id}`);
    },

    getDepartments(
        page = 0,
        size = 10,
        sortBy = "id",
        sortDir = "asc",
        search = ""
    ) {

        return api.get("/departments/page", {
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

export default DepartmentService;