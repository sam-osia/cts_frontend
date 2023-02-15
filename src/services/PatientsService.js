import httpCommon from "./http-common";

const getAll = () => {
    return httpCommon.get("/allPatients");
}

const get = id => {
    return httpCommon.get(`/patients/${id}`);
}

const create = data => {
    return httpCommon.post("/addPatient", data);
}

const update = (id, data) => {
    return httpCommon.put(`/patients/${id}`, data);
}

const remove = id => {
    return httpCommon.delete(`/patients/${id}`);
}

const removeAll = () => {
    return httpCommon.delete(`/patients`);
}

const findByTitle = title => {
    return httpCommon.get(`/patients?title=${title}`);
}

const PatientsService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
}

export default PatientsService;