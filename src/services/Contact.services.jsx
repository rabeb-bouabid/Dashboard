import http from "./AxiosContext";


const getMessages=() => { 
    return http.get("/contact")
}
const deleteMsg=() => { 
    return http.delete(`/contact`) 
}
const deleteNotif=() => { 
    return http.delete(`/notifications/deleteAllNotifications`) 
}
export default { 
    getMessages,deleteMsg,deleteNotif
}