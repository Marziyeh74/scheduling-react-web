import { useState,useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
// import CallUs from './components/Navbar';
import Tasks from './components/Tasks/Tasks';
 import AddTask from './components/Tasks/AddTask';
import ViewTask from './components/Tasks/ViewTask';
import EditTask from './components/Tasks/EditTask';
import {Routes,Route,useNavigate,Navigate} from 'react-router-dom';
// import {
//   Tasks,
//   Navbar} from './components';
import {getAllTasks,getAllCategories,createTask,deleteTask} from "./services/taskService";
import { COMMENT, CURRENTLINE, FOREGROUND, PINK, PURPLE, YELLOW } from './helpers/colors';
import { confirmAlert } from 'react-confirm-alert'; // Import
import SearchTask from './components/Tasks/SearchTask';
import { TaskContext } from './context/taskContext';
const App = () => {
  const [getTasks,setTasks]=useState([]);
  const [getCategories,setCategories]=useState([]);
  const [loading,setLoading]= useState(false);

  const [query,setQuery] = useState({text:""});
  const [getFilteredTasks,setFilteredTasks]=useState([]);

  const [forceRender,setForceRender]=useState(false);
  const navigate = useNavigate();
  const [getTask,setTask]= useState({
    title:"",
    category:"",
    priority:"",
    color:"",
    description:"",
    status:"ACTIVE" 
  });

  const setTaskInfo = (event) =>{
    setTask({...getTask,[event.target.name]:event.target.value,});
  };
  console.log("app");

  const taskSearch = (event) =>{
    setQuery({... query , text:event.target.value});
    
    const allTasks= getTasks.filter((task)=> {
      return task.title.toLowerCase().includes(event.target.value.toLowerCase());
    });

    setFilteredTasks(allTasks);

  } 
  /*
  solution 1:Rerder -> forceRender , setforceRender

  */
  const createTaskFrom = async(event) => {
    event.preventDefault();
    try {
      const {status} = await createTask(getTask) ;
      if(status ===201){
        setTask({});
        navigate("/tasks");
        setForceRender(true);
      }
    } catch (error) {
      console.log(error.message);
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
                removeTask2(taskId);
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
  // it is my first code .. 
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
  
  // That is what was said in movie
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


  useEffect ( () =>{
    const fetchData = async () => {
      try {

        setLoading(true);

        const {data:tasksData} = await getAllTasks();

        setTasks(tasksData);
        setFilteredTasks(tasksData);
        setLoading(false);
        setForceRender(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
        setForceRender(false);
      }
    };
    fetchData();
  },[forceRender]

  );
  return (
    <div className="App">
      <Navbar  query={query} search={taskSearch}/>
      <Routes>
        <Route path="/" element={<Navigate to ="/tasks" />}/>
        <Route path="/callUs" element={<CallUs />}/>
        <Route  path="/tasks" element={  <Tasks  tasks={getFilteredTasks}  loading={loading} confirmDelete={confirmDelete} />}>
          </Route>
        {/* <Route  path="/tasks/add" element={<AddTask loading={loading} exact/>}/> */}
        <Route  path="/tasks/add" element={<AddTask loading={loading} setTaskInfo={setTaskInfo} task={getTask} categories={getCategories} createTaskFrom={createTaskFrom}/>}/>
        <Route  path="/tasks/:taskId" element={<ViewTask />}/>
        <Route  path="/tasks/edit/:taskId" element={<EditTask   setForceRender={setForceRender} forceRender={setForceRender} />}/>
      </Routes>
    
    </div>
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

