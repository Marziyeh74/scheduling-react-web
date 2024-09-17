

import { Link } from "react-router-dom";

import Spinner from "../Spinner";
import { COMMENT,GREEN,PURPLE } from "../../helpers/colors";
import { useContext } from "react";
import { TaskContext } from "../../context/taskContext";
import { Formik ,Form,Field,ErrorMessage} from "formik";
import { taskSchema } from "../../validations/taskValidation";

const AddTask = () => {

    // const {loading,onTaskChange,task,categories,createTask} = useContext(TaskContext);
    const {loading,categories,createTask} = useContext(TaskContext);

    console.log('addTask');
    console.log(categories);

    return (
        <>
      
        <section className="p-3">
        <div className="container">
            <div className="row">
                <div className="col">

                    <p className="h4 fw-bold text-center" style={{color:GREEN}}>
                        ایجاد تسک جدید
                    </p>
                </div>
            </div>
        
            <hr style={{color:GREEN}}/>
            {loading ? (
                <Spinner />
            ):
            (
                <>
            <div className="row mt-5">
                <div className="col-md-4">
                    {/* {errors?.map((err,index)=> (
                        <p key={index} className="text-danger"> {err.message}

                        </p>
                    ))} */}
                    <Formik 
                    
                        initialValues = {{
                            Title:"",
                            Category:"",
                            Priority:"",
                            Color:"",
                            Description:"",

                        }}
                        
                        validationSchema={taskSchema} 
                        onSubmit= {(values) => {
                            createTask(values);
                        }}
   
                    >
                            
                               
                                <Form >
                                <div className="mb-2">
                                    <label for="Title" className="form-label col-form-labe">عنوان
                                    </label>
                                    <Field
                                        name="Title"
                                        type="text"
                                        className="form-control"
                                        placeholder="عنوان"
                                      
                                
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
                                    <ErrorMessage  name="Description" render={(msg)=> (<div className="text-danger"> {msg}</div>)} />
                                </div>
                                <div className="mx-2">
                                    <input
                                        type="submit"
                                        className="btn"
                                        style={{backgroundColor:PURPLE}}
                                        value="ایجاد"
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

 export default AddTask;