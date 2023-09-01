import http from "./AxiosContext";


const createPrestataires=(data) => { 
    return http.post("/prestataire",data )
}
const getAllPrestataires=() => { 
    return http.get("/prestataire") 
}
const updatePrestataires=(id , data ) => { 
    return http.put(`/prestataire/${id}`, data ) 
}
const getPrestatairesByService=(id ) => { 
    return http.get(`/prestataire/getPrestatireByService${id}`) 
}
const deletePrestaire=(id ) => { 
    return http.delete(`/prestataire/${id}`) 
}
const getPesta=(id ) => { 
    return http.get(`/prestataire/${id}`) 
}
export default { 
    createPrestataires,getAllPrestataires,updatePrestataires,getPrestatairesByService,deletePrestaire,getPesta
}