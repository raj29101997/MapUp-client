import api from "../pages/Auth/api";

export const getAPIdata = async (route) => {
    const response = await api.get(route);
    return response
}