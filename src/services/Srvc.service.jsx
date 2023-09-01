/* eslint-disable no-template-curly-in-string */
/* eslint-disable import/no-anonymous-default-export */
import http from "./AxiosContext";

const createService=(data) => { 
    return http.post("/Services",data )
}
const getAllServices=() => { 
    return http.get("/Services/GetAllServices") 
}
const deleteService=(id ) => { 
    return http.delete(`/Services/DeleteService/${id}`) 
}
const updateSrvc=(id , data ) => { 
    return http.put(`/Services/UpdateService/${id}`, data ) 
}
const getSrvc=(id ) => { 
    return http.get(`/Services/GetServiceById/${id}`) 
}

export default { 
    createService , getAllServices ,deleteService, updateSrvc,getSrvc
}

