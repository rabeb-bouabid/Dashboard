import http from "./AxiosContext";

const signinadmin=(data) => { 
    return http.post("/auth/signinadmin",data )
}


const getAdmin=(id) => { 
    return http.get(`/admin/${id}` ) 
}

const logoutadmin=(data ) => { 
    return http.post("/auth/logoutAdmin",data )
}

const updateAdmin=(id , data ) => { 
    return http.put(`/admin/${id}`, data ) 
}

export default { 
   signinadmin,getAdmin,logoutadmin,updateAdmin
}
