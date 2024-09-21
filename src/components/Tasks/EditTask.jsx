import { useState,useEffect, useContext } from "react";
import { Link,useParams,useNavigate } from "react-router-dom";
import {getTask,updateTask} from "../../services/taskService";
import Spinner from "../Spinner";
import { ORANGE,COMMENT, PURPLE } from "../../helpers/colors";
import { TaskContext } from "../../context/taskContext";
import { Formik ,Form,Field,ErrorMessage} from "formik";
import { taskSchema } from "../../validations/taskValidation";
import {useImmer} from "use-immer";
import {toast} from "react-toastify";
const EditTask = () => {

  const {taskId}=useParams();
  console.log("taskId = "+taskId);


  const navigate = useNavigate();
  const [task,setTask]=useImmer({});

 const {tasks,setTasks,setFilteredTasks,loading,setLoading,categories} = useContext(TaskContext);
  useEffect (()=>{
    console.log('line 17');
    const fetchData = async () => {
      try {
                setLoading(true);
              const {data:taskData}= await getTask(taskId);
              console.log('line 27');
              console.log(taskData);
             
            setLoading(false);
            setTask(taskData[0]);
          } catch (error) {
              console.log(error.message);
              setLoading(false);
          }
      };
      fetchData();

  },[]);
  // const {loading,task, categories}=state;

  

  // don`t need it when using formik
  /*
  const updateTaskInfo = (event) =>{
    // setState({...state,task:{... state.task,[event.target.name]:event.target.value,},});
    setTask({...task,[event.target.name]:event.target.value,});
  };
  console.log("app");
*/
  /*
  NOTE
  * 1.Rerender -> forceRender, setForceRender
  * 2. send reqest again to server for getAllTasks here
  * 3. update local state here
  * 4. update local state before sending request
  */
  const submitForm = async(values) => {
    // event.preventDefault();
    try {
        setLoading(true);
        //copy state-- update -send request -- if status==200 -> do nothing , else setT\
        const {data,status} = await updateTask(values) ;
       
      if(status===200){
        toast.info("تسک با موفقیت ویرایش شد");
        setLoading(false);
        const allTasks=[...tasks];
        
        /*const taskIndex = allTasks.findIndex(c=> c.Id === taskId);  // or == works
        // const taskIndex = allTasks.findIndex(c=> c.id === parseInt(taskId)); //not works (but it was said in video as correct way)
        //allTasks[taskIndex]=task; // it is said in video  it should not work -- the correct way is using data. but it works !
        allTasks[taskIndex]=data[0]; 
        
        setTasks(allTasks);
        setFilteredTasks(allTasks);
      */

        setTasks((draft)=> {

          const taskIndex=draft.findIndex(c=> c.Id === parseInt(taskId));
          console.log(taskIndex);
          console.log(data[0]);
          draft[taskIndex]= data[0];
          console.log('draft:',draft);
        });

        setFilteredTasks((draft)=> {

          const taskIndex=draft.findIndex(c=> c.Id === parseInt(taskId));
          draft[taskIndex]= data[0];
        });
        navigate("/tasks");
      }

      //else if we got other status code like 400 , .. we should check
     
     
      
    } catch (error) {
      console.log(error.message);
      setLoading(false);
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
        {loading ? (
            <Spinner />
        ):
        (
            <>
        <div className="row p-2 w-75 mx-auto align-items-center">
            <div className="col-md-8">
                <Formik
                
                initialValues={{
                    Id:task.Id,
                    Title:task.Title,
                    Category:task.Category ,
                    Priority:task.Priority,
                    Color:task.Color,
                    Description:task.Description
                }
                }

                validationSchema={taskSchema}
                onSubmit={(values) => {
                    submitForm(values);
                }}

                >
                <Form>
                    <div className="mb-2">
                        <label for="Title" className="form-label col-form-labe">عنوان
                        </label>
                        <Field
                            name="Title"
                            type="text"
                            className="form-control"
                        />
                     <ErrorMessage name="Title" render={(msg)=> (<div className="text-danger"> {msg}</div>)} />   
                    </div>
                  
                    <div className="mb-2">
                    <label for="Category" className="form-label col-form-labe">دسته بندی
                    </label>
                       <Field
                         name="Category"
                         as="select"
                         className="form-control"
                       >
                        <option value="">انتخاب دسته بندی </option>
                        {categories.length > 0 &&
                        categories.map((c)=>(
                            <option key={c.Id} value={c.Id}>{c.Title}</option>
                        ))}
                        </Field>
                        <ErrorMessage name="Category" render={(msg)=> (<div className="text-danger"> {msg}</div>)} /> 
                    </div>

                    <div className="mb-2">
                    <label for="Priority" className="form-label col-form-labe">الویت
                    </label>
                        <Field
                            name="Priority"
                            type="number"
                            min="0" max="5"
                            className="form-control"
                        />
                     <ErrorMessage name="Priority" render={(msg)=> (<div className="text-danger"> {msg}</div>)} />   
                    </div>
                    <div className="mb-2">
                    <label for="Color" className="form-label col-form-labe">رنگ
                    </label>
                        <Field
                            name="Color"
                            type="color"
                            className="form-control"
                           
                        />
                      <ErrorMessage name="Color" render={(msg)=> (<div className="text-danger"> {msg}</div>)} />  
                    </div>
                    <div className="mb-2">
                    <label for="Description" className="form-label col-form-labe">توضیحات 
                    </label>
                        <Field
                            name="Description"
                            type="textarea"
                            className="form-control"
                           
                        />
                       <ErrorMessage name="Description" render={(msg)=> (<div className="text-danger"> {msg}</div>)} /> 
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
                </Form>

                </Formik>
                
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