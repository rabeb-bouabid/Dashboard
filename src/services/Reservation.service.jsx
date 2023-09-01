/* eslint-disable no-template-curly-in-string */
/* eslint-disable import/no-anonymous-default-export */
import http from "./AxiosContext";

const createReservation=(data)=>{
    return http.post("/Reservation",data)
}
const getAllNotifications=() => { 
    return http.get("/notifications/getAllNotifications") 
}

const getAllReservation=() => { 
    return http.get("/Reservation") 
}
const getAReservation=() => { 
    return http.get("/Reservation/?searchText=${searchText}") 
}

const getReservation=(id) => { 
    return http.get(`/Reservation/${id}`) 
}
const updateReservation=(id , data ) => { 
    return http.put(`/Reservation/UpdateReservation/${id}`, data ) 
}
const deleteReservation=(id) => { 
    return http.delete(`/Reservation/DeleteReservation/${id}`) 
}
export default { 
    getAllReservation , getReservation, deleteReservation,updateReservation ,getAReservation,createReservation,getAllNotifications
}

