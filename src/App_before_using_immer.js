import { useState,useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
// import CallUs from './components/Navbar';
import Tasks from './components/Tasks/Tasks';
 import AddTask from './components/Tasks/AddTask';
import ViewTask from './components/Tasks/ViewTask';
import EditTask from './components/Tasks/EditTask';
import {Routes,Route,useNavigate,Navigate} from 'react-router-dom';

import _ from 'lodash';
// import { taskSchema } from './validations/taskValidation'; 
// import {
//   Tasks,
//   Navbar} from './components';
import {getAllTasks,getAllCategories,createTask,deleteTask} from "./services/taskService";
import { COMMENT, CURRENTLINE, FOREGROUND, PINK, PURPLE, YELLOW } from './helpers/colors';
import { confirmAlert } from 'react-confirm-alert'; // Import
import SearchTask from './components/Tasks/SearchTask';
import { TaskContext } from './context/taskContext';
import Task from './components/Tasks/Task';
const App = () => {
  const [tasks,setTasks]=useState([]);
  const [categories,setCategories]=useState([]);
  const [loading,setLoading]= useState(false);
  // const [errors,setErrors] = useState([]);
  
  // const [query,setQuery] = useState({text:""});
  const [filteredTasks,setFilteredTasks]=useState([]);

  const [forceRender,setForceRender]=useState(false);
  const navigate = useNavigate();
  // not nessary to define title,...
  const [task,setTask]= useState({
    // title:"",
    // category:"",
    // priority:"",
    // color:"",
    // description:"",
    // status:"ACTIVE" 
  });

  // oldName = setTaskInfo
  //no need after using Formik
  const onTaskChange = (event) =>{
    setTask({...task,[event.target.name]:event.target.value,});
  };
  
//  1- solution 1
 /*const taskSearch = (event) =>{
    setQuery({... query , text:event.target.value});
    
    console.log(event.target.value);
    const allTasks= tasks.filter((task)=> {
      return task.title.toLowerCase().includes(event.target.value.toLowerCase());
    });

    
    setFilteredTasks(allTasks);

  } 
  */

  //1 - refactor 1
  /*const taskSearch = (query) => {
    console.log(query);
    setFilteredTasks(tasks.filter((task) =>{
      return task.Title.toLowerCase().includes(query.toLowerCase()); 
    }
    ));
  }*/
  // 2- optimized with setTimeout
  //we don`t need query , so we delete setQuery and it`s state
  // did not work
  
  /*let filterTimeout;
  const taskSearch = (query) =>{
     console.log(query);
     clearTimeout(filterTimeout);
    if(!query) return setFilteredTasks([... tasks]);

    filterTimeout = setTimeout(()=> {
      console.log("line 80");
      setFilteredTasks(tasks.filter((task)=> {
          
        return task.Title.toLowerCase().includes(query.toLowerCase());
      }));
    },1000);

    console.log(filteredTasks);
    console.log('filterTimeout');
    console.log(filterTimeout);
    

  } ;
  */

  //3- using debounce
 // did not work 
  
  const taskSearch = _.debounce((query) =>{

    console.log(query);
    if(!query){
      console.log("no q");
      return setFilteredTasks([... tasks]);
    } 
    
    
    setFilteredTasks(tasks.filter((task) => {
      return task.Title.toLowerCase().includes(query.toLowerCase());
    }));
  },500);
  
  /*
  solution 1:Rerder -> forceRender , setforceRender
  solution 2: setTask(data) : don`t need to use useEfect for updating
  */
  const createTaskFrom = async(values) => {
    // event.preventDefault();
    try {
      setLoading((prevLoading) => !prevLoading);
     
      // await taskSchema.validate(task,{abortEarly:false});


      const {status,data} = await createTask(values) ;
      console.log('data:');
      console.log(data);
      console.log(status);
      if(status ===200){
        const allTasks= [... tasks,data[0]]; // we use data[0] because of Api gateway
        setTasks(allTasks);
        setFilteredTasks(allTasks);
        // setTask({});
        // setErrors([]);
        setLoading((prevLoading) => !prevLoading);
        navigate("/tasks");
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.inner);
      // setErrors(error.inner);
      setLoading((prevLoading) => !prevLoading);
    }

  }

  // e.g for test
  /*const confirmDelete = () => {
    confirmAlert({
      title: 'پاک کردن تسک',
      message: 'آیا مطمینی می خواهی حذف کنی؟',
      buttons: [
        {
          label: 'مطین هستم',
          onClick: () => alert('Click Yes')
        },
        {
          label: 'انصراف',
          onClick: () => alert('Click No')
        }
      ]
    });
  };
  */

  const confirmDelete = (taskId,taskTitle) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div dir='rtl' style={
            {backgroundColor:CURRENTLINE , 
            border: `1px solid ${PURPLE}`,
            borderRadius:"1em"}} 
            className='p-4'
            >
            <h1 style={{color: YELLOW}}>حذف تسک</h1>
            <p style={{color: FOREGROUND}}>مطمینی  که می خواهی تسک {taskTitle} را حذف کنی؟</p>
            <button
              onClick={() => {
                removeTask4(taskId);
                onClose();
              }}
              className='btn mx-2'
              style={
                {backgroundColor:PURPLE }}
            >
              مطمین هستم
            </button>
            <button onClick={onClose} className='btn' style={{backgroundColor:COMMENT}}>
                انصراف
            </button>
          </div>
        );
      }
    });
  }
  // it is my first code ..  1. solution 1: setforceRender
  const removeTask = async(taskId) => {
    try {
      // setLoading(true);

      const response = await deleteTask(taskId);
      console.log(response);
      if(response){
        console.log('111');
        setTask({});
        navigate("/tasks");
        setForceRender(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  
  // That is what was said in movie..2: send reqest again
  const removeTask2 = async(taskId) => {
    try {
      setLoading(true);

      const response = await deleteTask(taskId);
      console.log(response);
      if(response){
       const {data:tasksData} = await getAllTasks();
       setTasks(tasksData);
       setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  }
  //solution4

  const removeTask4 = async(taskId) => {
    const allTasks= [... tasks];
    try {
      
      const updatedTasks=allTasks.filter(c=> c.id !== taskId);
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
      const {status} = await deleteTask(taskId);
      console.log(status);
      if(status !== 200){
       
       setTasks(allTasks);
       setFilteredTasks(allTasks);
       
      }
    } catch (error) {
      console.log(error.message);
      setTasks(allTasks);
      setFilteredTasks(allTasks);
    
    }
  }

  useEffect( ()=>{
    const fetchData = async () => {
      try {

        setLoading(true);
       
        const {data:tasksData} = await getAllTasks();
        const {data:categroiesData} = await getAllCategories();

       
        setTasks(tasksData);
        setFilteredTasks(tasksData);
        setCategories(categroiesData);
        setLoading(false);
        
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    fetchData();

  },[]);


  // useEffect ( () =>{
  //   const fetchData = async () => {
  //     try {

  //       setLoading(true);

  //       const {data:tasksData} = await getAllTasks();

  //       setTasks(tasksData);
  //       setFilteredTasks(tasksData);
  //       setLoading(false);
  //       setForceRender(false);
  //     } catch (error) {
  //       console.log(error.message);
  //       setLoading(false);
  //       setForceRender(false);
  //     }
  //   };
  //   fetchData();
  // },[forceRender]

  // );
  return (
    <TaskContext.Provider value={
      {
        loading,
        setLoading ,
        task,
        tasks,
        setTasks,
        filteredTasks,
        setFilteredTasks,
        categories,
        onTaskChange,
        setFilteredTasks,
        deleteTask:confirmDelete,
        createTask:createTaskFrom,
        taskSearch : taskSearch , 
        // errors,
        // taskQuery:query , 

      }
    }> 
       <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to ="/tasks" />}/>
        <Route path="/callUs" element={<CallUs />}/>
        <Route  path="/tasks" element={  <Tasks/>}>
          </Route>
        {/* <Route  path="/tasks/add" element={<AddTask loading={loading} exact/>}/> */}
        <Route  path="/tasks/add" element={<AddTask/>}/>
        <Route  path="/tasks/:taskId" element={<ViewTask />}/>
        <Route  path="/tasks/edit/:taskId" element={<EditTask  />}/>
      </Routes>
    
    </div>
    </TaskContext.Provider>
   
  );
}

export default App;
//link works
function CallUs(){
  return(

    <>
      <h1 style={{color:PINK}}>call us</h1>
    </>
  );
}

// link works
/*function AddTask() {
  console.log('AddTask');
  return(

    <>
      <h1 style={{color:PINK}}>Add Task</h1>
    </>
  );
}*/

