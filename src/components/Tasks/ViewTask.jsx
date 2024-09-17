import { useState,useEffect, useContext } from "react";
import { Link,useParams } from "react-router-dom";
import {getTask,getCategory} from "../../services/taskService";
import Spinner from "../Spinner";
import { CURRENTLINE,CYAN,COMMENT, PURPLE } from "../../helpers/colors";
import { TaskContext } from "../../context/taskContext";
const ViewTask = () => {
    const {taskId}= useParams();

    console.log("taskId = "+taskId);
    // const [state,setState]=useState({
    //     loading:false,
    //     task:{},
    //     category:{}
    // });
    const {loading,setLoading}=useContext(TaskContext);
    const [task,setTask]=useState({});
    const [category,setCategory]=useState({});

    useEffect (()=>{
        console.log('line 17');
        const fetchData = async () => {
            try {
                // setState({...state,loading:true});
                setLoading(true);
                const {data:taskData}= await getTask(taskId);
                console.log(taskData[0]);
                 const {data:categoryData} = await getCategory(taskData[0].Category);
                
               
                setTask(taskData[0]);
                // const categoryData=  {
                //     "Id": 2,
                //     "Title": "کاری"
                // }; 
                setCategory(categoryData[0]);
                setLoading(false);
                // setState({...state,
                //     loading:false,
                //     category : categoryData,
                //     task:taskData});
            } catch (error) {
                console.log(error.message);
                setLoading(false);
                // setState({...state,loading:false});
            }
        };
        fetchData();

    },[]);
    // const {loading,task,category}=state;
    console.log(task.Title);
    return (
        <>
      
        <section className="view-task-intro p3">
            <div className="container">
                <div className="row my-2 text-center">
                

                    <p className="h4 fw-bold text-center" style={{color:CYAN}}>
                    اطلاعات تسک
                    </p>
                </div>
            </div>
            </section>
        
            <hr style={{color:CYAN}}/>
            {loading ? (
                <Spinner />
            ):
            (
                <>
                 {Object.keys(task).length > 0 && ( 
                    <section className="view-task mt-e">
                        <div className="container p-2" style={{borderRadius:"1em" , backgroundColor:CURRENTLINE}}>
                            <div className="row p-2 w-75 mx-auto align-items-center">
                                <div className="col-md-8">
                                    <p className="fw-bold text-center" style={{backgroundColor:COMMENT }}>
                                       عنوان: {task.Title}
                                    </p>
                                
                                    <p className="fw-bold text-center" style={{backgroundColor:COMMENT }}>
                                     الویت: {task.Priority}
                                    </p>
                               
                            
                                
                                    <p className="fw-bold text-center" style={{backgroundColor:COMMENT }}>
                                       دسته بندی :{category.Title}
                                    </p>
                                    <Link to={"/tasks"} className="btn mx-2" style={{backgroundColor:PURPLE}}>

                                            برگشت به صفحه اصلی
                                            
                                            <i className="fa fa-plus-home mx-2"/>

                                            </Link>
                                </div>
                             </div> 
                           
                        </div>
                    </section>
                 ) } 
            </>
            )
           
            }
           
       
        
           </>
        
    );
}

export default ViewTask;