import commonAPI from "./commonAPI";
import SERVER_URL from "./serverUrl";

// register api 
export const registerAPI = async(reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/register`, reqBody)

}
// login api
export const loginAPI=async(reqBody)=>{
    return await  commonAPI("POST",`${SERVER_URL}/login`,reqBody)

}
export const gettaskAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/gettasks`,{},reqHeader)
}

export const posttaskAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/addTask`,reqBody,reqHeader)
}
export const deleteTaskApi=async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/deletetask/${id}`,{},reqHeader)
}

export const updateTaskApi=async(id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/updatetask/${id}`,reqBody,reqHeader)
}
