

import { Link } from "react-router-dom";

import Spinner from "../Spinner";
import { COMMENT,GREEN,PURPLE } from "../../helpers/colors";
import { useContext } from "react";
import { TaskContext } from "../../context/taskContext";
import { useFormik } from "formik";
import { taskSchema } from "../../validations/taskValidation";

const AddTask = () => {

    // const {loading,onTaskChange,task,categories,createTask} = useContext(TaskContext);
    const {loading,categories,createTask} = useContext(TaskContext);

    console.log('addTask');
    console.log(categories);

    const formik = useFormik({
        initialValues : {
            Title:"",
            Category:"",
            Priority:"",
            Color:"",
            Description:"",

        },
        // we can build our schema or use or pre-built schema
        validationSchema:taskSchema,
        onSubmit: (values) => {
             console.log(values);
            createTask(values);
        }
    });
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
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-2">
                            <label for="Title" className="form-label col-form-labe">عنوان
                            </label>
                            <input
                                id="Title"
                                type="text"
                                className="form-control"
                                placeholder="عنوان"
                                // value={task.Title}
                                 // onChange={onTaskChange}
                                   // required={true}
                                 /*  
                                name="Title"
                                value={formik.values.Title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                */
                                {... formik.getFieldProps("Title")}
                               
                            />
                           {formik.touched.Title && formik.errors.Title ? (<div className="text-danger">{formik.errors.Title}</div>): null}
                        </div>
                      
                        <div className="mb-2">
                        <label for="Category" className="form-label col-form-labe">دسته بندی
                        </label>
                           <select
                            
                            id="Category"
                            className="form-control"
                            {... formik.getFieldProps("Category")}
                            
                           >
                            <option value="">انتخاب دسته بندی </option>
                            {categories.length > 0 &&
                            categories.map((c)=>(
                                <option key={c.Id} value={c.Id}>{c.Title}</option>
                            ))}
                            </select>
                            {formik.touched.Category && formik.errors.Category ? (<div className="text-danger">{formik.errors.Category}</div>): null}
                        </div>

                        <div className="mb-2">
                        <label for="Priority" className="form-label col-form-labe">الویت
                        </label>
                            <input
                               
                                id="Priority"
                                type="number"
                                min="0" max="5"
                                className="form-control"
                                {... formik.getFieldProps("Priority")}
                                
                            />
                            {formik.touched.Priority && formik.errors.Priority ? (<div className="text-danger">{formik.errors.Priority}</div>): null}
                        </div>
                        <div className="mb-2">
                        <label for="Color" className="form-label col-form-labe">رنگ
                        </label>
                            <input
                                id="Color"
                                name="Color"
                                type="color"
                                className="form-control"
                                {... formik.getFieldProps("Color")}
                            />
                        {formik.touched.Color && formik.errors.Color ? (<div className="text-danger">{formik.errors.Color}</div>): null}   
                        </div>
                        <div className="mb-2">
                        <label for="Description" className="form-label col-form-labe">توضیحات 
                        </label>
                            <input
                                id="Description"
                                name="Description"
                                type="textarea"
                                className="form-control"
                                {... formik.getFieldProps("Description")}
                                
                            />
                             {formik.touched.Description && formik.errors.Description ? (<div className="text-danger">{formik.errors.Description}</div>): null}   
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

 export default AddTask;