import { Fragment } from "react";
import {  CURRENTLINE, ORANGE, PINK } from "../../helpers/colors";
import Task from "./Task";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";

const Tasks = ({tasks,loading,confirmDelete}) => {
    console.log(tasks);
    // const navigate = useNavigate();
    return (

        <>
    
        <section className="container">
            <div className="grid">
                <div className="row">
                    <div className="col">
                        <p className="h3 float-end">
                         

                            <Link to={"/tasks/add"} className="btn m-2" style={{backgroundColor:PINK}}>

                            ایجاد تسک جدید
                              
                              <i className="fa fa-plus-circle mx-2"/>

                            </Link>
                          
                              
                            
                           
                           
                        </p>
                    </div>
                </div>
            </div>
        </section>
        {
            loading ? <Spinner />:
            (
                <section className="container">
                <div className="row">
                    {
                        tasks ? tasks.map(t => (
                            <Task key={t.id} task={t} confirmDelete={() => confirmDelete(t.id,t.title)}/>
                        )) : (
                            <div className="text-center py-5" style={{backgroundColor:CURRENTLINE}}> 
                            <p className="h3" style={{color:ORANGE}}>
                                کاری ایجاد نشده است...
                            </p>
                            {/* <img src={NotFound} alt="پیدا نشد" className="w-25" /> */}
                            <img src={require("../../assets/NotFound.gif")} alt="پیدا نشد" className="w-25" />
                            </div>
                        )
                    }
                    
                </div>
            </section>
            )
    
        }
        </>
    );
};

export default Tasks;