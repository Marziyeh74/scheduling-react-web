import axios from "axios";

// const SERVER_URL="http://localhost:9000";
const SERVER_URL="http://localhost:1010/api";


//@desc Get all tasks
//@route GET http://localhost:9000/tasks
export const getAllTasks = () =>{
    // const url=`${SERVER_URL}/tasks`;
    const url=`${SERVER_URL}/tasks_get`;
    return axios.post(url);
}

//@desc Get task with Task ID
//@route GET http://localhost:9000/tasks/:taskId
export const getTask_old = (taskId) => {
    const url=`${SERVER_URL}/tasks/${taskId}`;
    return axios.get(url);
}

// the data in response is array : [{}] not object
export const getTask = (taskId) => {
    const url=`${SERVER_URL}/tasks_get_by_id`;
    const obj= { "TaskId" : taskId};
    const response = axios.post(url,obj);
    console.log('response is : ');
    console.log(response);
    return response;
}

//@desc Get all categories
//@route GET http://localhost:9000/categories
export const getAllCategories = () => {
    // const url=`${SERVER_URL}/categories`;
    const url=`${SERVER_URL}/categories_get`;
    return axios.post(url);
}

//@desc Get categories with Category ID
//@route GET http://localhost:9000/categories/:catId
export const getCategory_old = (catId) => {
    const url=`${SERVER_URL}/categories/${catId}`;
    return axios.get(url);
}

export const getCategory = (catId) => {
    const url=`${SERVER_URL}/categories_get_by_id`;
    const obj= { "CatId" : catId};
    const response = axios.post(url,obj);
    console.log('response for getCategory:');
    console.log(response);
    return response;
}

//@desc Create task 
//@route POST http://localhost:9000/tasks => returns the inserted task
export const createTask_old = (task) => {
    const url=`${SERVER_URL}/tasks`;
    return axios.post(url,task);
}
// the api :http://localhost:1010/api/tasks_insert  returns the inserted task
export const createTask = (task) => {
    console.log(task);
    task.UserId=1;
    console.log(task);
    const url=`${SERVER_URL}/tasks_insert`;
    const response= axios.post(url,task);
    console.log(response);
    return response;
}

//@desc Update task  with taskId
//@route POST http://localhost:9000/tasks/:taskId
export const updateTask_old = (task , taskId) => {
    const url=`${SERVER_URL}/tasks/${taskId}`;
    return axios.put(url,task)
}

// the api :http://localhost:1010/api/tasks_update
export const updateTask = (task) => {
    const url=`${SERVER_URL}/tasks_update`;
    const response= axios.post(url,task);
    console.log(response);
    return response;
}

//@desc Delete task  with taskId
//@route DELETE http://localhost:9000/tasks/:taskId
// return response {data , status,statusText,headers,request,config}
export const deleteTask_old = (taskId) => {
    const url=`${SERVER_URL}/tasks/${taskId}`;
    return axios.delete(url);

}

// the api :http://http://localhost:1010/api/tasks_delete_by_id returns response
export const deleteTask = (taskId) => {
    const url=`${SERVER_URL}/tasks_delete_by_id`;
    const obj= { "TaskId" : taskId};
    const response=  axios.post(url,obj);
    console.log(response);
    return response;
}