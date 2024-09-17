import axios from "axios";

const SERVER_URL="http://localhost:9000";


//@desc Get all tasks
//@route GET http://localhost:9000/tasks
export const getAllTasks = () =>{
    const url=`${SERVER_URL}/tasks`;
    return axios.get(url);
}

//@desc Get task with Task ID
//@route GET http://localhost:9000/tasks/:taskId
export const getTask = (taskId) => {
    const url=`${SERVER_URL}/tasks/${taskId}`;
    return axios.get(url);
}

//@desc Get all categories
//@route GET http://localhost:9000/categories
export const getAllCategories = () => {
    const url=`${SERVER_URL}/categories`;
    return axios.get(url);
}

//@desc Get categories with Category ID
//@route GET http://localhost:9000/categories/:catId
export const getCategory = (catId) => {
    const url=`${SERVER_URL}/categories/${catId}`;
    return axios.get(url);
}

//@desc Create task 
//@route POST http://localhost:9000/tasks
export const createTask = (task) => {
    const url=`${SERVER_URL}/tasks`;
    return axios.post(url,task);
}

//@desc Update task  with taskId
//@route POST http://localhost:9000/tasks/:taskId
export const updateTask = (task , taskId) => {
    const url=`${SERVER_URL}/tasks/${taskId}`;
    return axios.put(url,task)
}

//@desc Delete task  with taskId
//@route DELETE http://localhost:9000/tasks/:taskId
// return response {data , status,statusText,headers,request,config}
export const deleteTask = (taskId) => {
    const url=`${SERVER_URL}/tasks/${taskId}`;
    return axios.delete(url);

}