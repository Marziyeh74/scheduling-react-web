import { useState,useEffect } from "react";
import { Link,useParams,useNavigate } from "react-router-dom";
import {getTask,getAllCategories,updateTask} from "../../services/taskService";
import Spinner from "../Spinner";
import { ORANGE,COMMENT, PURPLE } from "../../helpers/colors";

const EditTask = ({forceRender,setForceRender}) => {

  const {taskId}=useParams();
  console.log("taskId = "+taskId);


  const navigate = useNavigate();
  const [state,setState]=useState({
        loading:false,
        task:{},
        categories:[]
    });

  useEffect (()=>{
    console.log('line 17');
    const fetchData = async () => {
      try {
            setState({...state,loading:true});
            // setLoading(true);
            // console.log('line 25');
              const {data:taskData}= await getTask(taskId);
              console.log('line 27');
              console.log(taskData);
              const {data:categoriesData} = await getAllCategories();
            
             
              setState({...state,
                  loading:false,
                  categories : categoriesData,
                  task:taskData});
          } catch (error) {
              console.log(error.message);
              setState({...state,loading:false});
          }
      };
      fetchData();

  },[]);
  // const {loading,task, categories}=state;

  

  const updateTaskInfo = (event) =>{
    setState({...state,task:{... state.task,[event.target.name]:event.target.value,},});
  };
  console.log("app");

  const submitForm = async(event) => {
    event.preventDefault();
    try {
      setState ({... state,loading:true});
      const {data} = await updateTask(state.task,taskId,) ;
      
      setState({...state,loading:false});
      setForceRender(!forceRender);
      if(data){
        navigate("/tasks");
      }
     
     
      
    } catch (error) {
      console.log(error.message);
      setState({...state,loading:false});
    }

  }

  return (
    <>
  
    <section className="p-3">
    <div className="container">
        <div className="row my-2">
            <div className="col">

                <p className="h4 fw-bold text-center" style={{color:ORANGE}}>
                   ویرایش تسک
                </p>
            </div>
        </div>
    
        <hr style={{color:ORANGE}}/>
        {state.loading ? (
            <Spinner />
        ):
        (
            <>
        <div className="row p-2 w-75 mx-auto align-items-center">
            <div className="col-md-8">
                <form onSubmit={submitForm}>
                    <div className="mb-2">
                        <label for="title" className="form-label col-form-labe">عنوان
                        </label>
                        <input
                            name="title"
                            type="text"
                            id="title"
                            className="form-control"
                            value={state.task.title}
                            required={true}
                            onChange={updateTaskInfo}
                        />
                        
                    </div>
                  
                    <div className="mb-2">
                    <label for="category" className="form-label col-form-labe">دسته بندی
                    </label>
                       <select
                        name="category"
                        id="category"
                        required={true}
                        className="form-control"
                        onChange={updateTaskInfo}
                        value={state.task.category}
                       >
                        <option value="">انتخاب دسته بندی </option>
                        {state.categories.length > 0 &&
                        state.categories.map((c)=>(
                            <option key={c.id} value={c.id}>{c.title}</option>
                        ))}
                        </select>
                        
                    </div>

                    <div className="mb-2">
                    <label for="priority" className="form-label col-form-labe">الویت
                    </label>
                        <input
                            name="priority"
                            id="priority"
                            type="number"
                            min="0" max="5"
                            className="form-control"
                            required={true}
                            onChange={updateTaskInfo}
                            value={state.task.priority}
                        />
                        
                    </div>
                    <div className="mb-2">
                    <label for="color" className="form-label col-form-labe">رنگ
                    </label>
                        <input
                            name="color"
                            type="color"
                            className="form-control"
                            onChange={updateTaskInfo}
                            value={state.task.color}
                        />
                        
                    </div>
                    <div className="mb-2">
                    <label for="description" className="form-label col-form-labe">توضیحات 
                    </label>
                        <input
                            name="description"
                            type="textarea"
                            className="form-control"
                            onChange={updateTaskInfo}
                            value={state.task.description}
                            
                        />
                        
                    </div>
                    <div className="mx-2">
                        <input
                            type="submit"
                            className="btn"
                            style={{backgroundColor:PURPLE}}
                            value="ذخیره"
                        />
                        <Link
                        to={"/tasks"}
                        className="btn mx-2"
                        style={{backgroundColor:COMMENT}}
                        
                        >انصراف
                        </Link>
                    </div>
                </form>
            </div>
        </div>
        </>
        )
       
        }
       
    </div>
    </section>
    
  
    </>
);
};

export default EditTask;