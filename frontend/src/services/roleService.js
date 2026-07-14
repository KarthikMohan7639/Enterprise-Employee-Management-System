import api from "../api/axios";
import { API } from "../config/apiConfig";

const RoleService = {

    getAllRoles() {
        return api.get(`${API.ROLE}/roles`);
    },

    getRoleById(id) {
        return api.get(`${API.ROLE}/roles/${id}`);
    },

    createRole(role) {
        return api.post(`${API.ROLE}/roles`, role);
    },

    updateRole(id, role) {
        return api.put(`${API.ROLE}/roles/${id}`, role);
    },

    deleteRole(id) {
        return api.delete(`${API.ROLE}/roles/${id}`);
    },

    getRoles(
        page = 0,
        size = 10,
        search = ""
    ) {
        return api.get(`${API.ROLE}/roles/page`, {
            params: {
                page,
                size,
                search
            }
        });
    }

};

export default RoleService;