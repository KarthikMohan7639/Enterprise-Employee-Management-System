import api from "../api/axios";
import { API } from "../config/apiConfig";

const DepartmentService = {

    getAllDepartments() {
        return api.get(`${API.DEPARTMENT}/departments`);
    },

    getDepartmentById(id) {
        return api.get(`${API.DEPARTMENT}/departments/${id}`);
    },

    createDepartment(department) {
        return api.post(`${API.DEPARTMENT}/departments`, department);
    },

    updateDepartment(id, department) {
        return api.put(`${API.DEPARTMENT}/departments/${id}`, department);
    },

    deleteDepartment(id) {
        return api.delete(`${API.DEPARTMENT}/departments/${id}`);
    },

    getDepartments(
        page = 0,
        size = 10,
        sortBy = "id",
        sortDir = "asc",
        search = ""
    ) {

        return api.get(`${API.DEPARTMENT}/departments/page`, {
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