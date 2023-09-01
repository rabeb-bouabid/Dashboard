import http from "./AxiosContext";


const signupAdmin=(data) => { 
    return http.post("/auth/signupAdmin",data )
}
const getAllAdmin=() => { 
    return http.get("/admin") 
}
const updateAdmin=(id , data ) => { 
    return http.put(`/admin/${id}`, data ) 
}
const getAdmin=(id ) => { 
    return http.get(`/admin/${id}`) 
}
const deleteAdmin=(id ) => { 
    return http.delete(`/admin/${id}`) 
}


const getAlluser=() => { 
    return http.get("/user") 
}
const deleteUser=(id ) => { 
    return http.delete(`/user/${id}`) 
}

export default { 
    getAlluser,deleteUser,getAllAdmin ,updateAdmin ,getAdmin , deleteAdmin , signupAdmin
}
