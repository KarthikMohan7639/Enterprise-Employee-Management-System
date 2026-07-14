import api from "../api/axios";
import { API } from "../config/apiConfig";

const DesignationService = {

    getAllDesignations() {
        return api.get(`${API.DESIGNATION}/designations`);
    },

    getDesignationById(id) {
        return api.get(`${API.DESIGNATION}/designations/${id}`);
    },

    createDesignation(designation) {
        return api.post(`${API.DESIGNATION}/designations`, designation);
    },

    updateDesignation(id, designation) {
        return api.put(
            `${API.DESIGNATION}/designations/${id}`,
            designation
        );
    },

    deleteDesignation(id) {
        return api.delete(
            `${API.DESIGNATION}/designations/${id}`
        );
    },

    getDesignations(
        page = 0,
        size = 10,
        sortBy = "id",
        sortDir = "asc",
        search = ""
    ) {

        return api.get(`${API.DESIGNATION}/designations/page`, {
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

export default DesignationService;