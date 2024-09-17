import { createContext } from "react";

export const TaskContext=createContext({
loading:false,
setLoading : () => {} ,
// task:{} , //after using Formik no need
tasks : [] ,  
setTasks : () => {},
// taskQuery:{},
categories : [] ,
filteredTasks:[],
setFilteredTasks: () => {},
// onTaskChange: () => {}, //after using Formik no need
deleteTask : () => {},
createTask: () => {},
taskSearch  :() => {},
// errors : [],

});