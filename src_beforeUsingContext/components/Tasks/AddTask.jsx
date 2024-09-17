
/*import { PINK } from "../../helpers/colors";


const AddTask = ({loading})=> {
    console.log('AddTask');
    console.log(loading);
    return(
  
      <>
        <h1 style={{color:PINK}}>Add Task</h1>
      </>
    );
  }
*/
/*
import { PINK } from "../../helpers/colors";
import Spinner from "../Spinner";

const AddTask = ({loading})=> {
    console.log('AddTask');
    console.log(loading);
    return(
  
      <>
       {loading ? (
        <Spinner />
       ) : (
        <h1 style={{color:PINK}}>Add Task</h1>)
       }
      </>
    );
}
*/

import { Link } from "react-router-dom";

import Spinner from "../Spinner";
import { COMMENT,GREEN,PURPLE } from "../../helpers/colors";


const AddTask = ({loading,setTaskInfo,task,categories,createTaskFrom}) => {
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
                    <form onSubmit={createTaskFrom}>
                        <div className="mb-2">
                            <label for="title" className="form-label col-form-labe">عنوان
                            </label>
                            <input
                                name="title"
                                type="text"
                                id="title"
                                className="form-control"
                                value={task.title}
                                placeholder="عنوان"
                                required={true}
                                onChange={setTaskInfo}
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
                            onChange={setTaskInfo}
                            value={task.category}
                           >
                            <option value="">انتخاب دسته بندی </option>
                            {categories.length > 0 &&
                            categories.map((c)=>(
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
                                onChange={setTaskInfo}
                                value={task.priority}
                            />
                            
                        </div>
                        <div className="mb-2">
                        <label for="color" className="form-label col-form-labe">رنگ
                        </label>
                            <input
                                name="color"
                                type="color"
                                className="form-control"
                                onChange={setTaskInfo}
                                value={task.color}
                            />
                            
                        </div>
                        <div className="mb-2">
                        <label for="description" className="form-label col-form-labe">توضیحات 
                        </label>
                            <input
                                name="description"
                                type="textarea"
                                className="form-control"
                                onChange={setTaskInfo}
                                value={task.description}
                                
                            />
                            
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