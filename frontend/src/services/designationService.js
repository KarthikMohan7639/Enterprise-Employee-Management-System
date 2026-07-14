import api from "../api/axios";

const DesignationService = {

    getAllDesignations() {
        return api.get("/designations");
    },

    getDesignationById(id) {
        return api.get(`/designations/${id}`);
    },

    getDesignations(
        page = 0,
        size = 10,
        sortBy = "id",
        sortDir = "asc",
        search = ""
    ) {

        return api.get("/designations/page", {
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