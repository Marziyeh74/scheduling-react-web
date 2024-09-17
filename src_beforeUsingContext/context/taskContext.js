import { createContext } from "react";

export const TaskContext=createContext({
loading:false,
setLoading : () => {} ,
task:{} , 
setTask : () => {},
tasks : [] , 
setTasks : () => {} , 
filteredTasks : [] ,
setFilteredTasks : () => {},
taskQuery:{},
categories : [] ,
onTaskChange: () => {},
deleteTask : () => {},
updateTask : () => {},
createTask: () => {},
taskSearch  :() => {},

});