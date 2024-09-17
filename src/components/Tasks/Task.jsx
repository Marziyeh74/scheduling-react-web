import { Link } from "react-router-dom";
import { CURRENTLINE, CYAN, ORANGE, PURPLE,RED } from "../../helpers/colors";
const Task = ({task,confirmDelete}) => {

    const taskStyle = {
        backgroundColor:task.Color ,
        border:'2px groove #c2c2d1'
    }
    return (
        <div className="col-md-5">
                    <div style={taskStyle} className="card my-2">
                        <div className="card-body">
                            <div className="row align-items-center justify-content-around">
                               
                                <div className="col-md-7 col-sm-7">
                                    <ul className="list-group">
                                        <li className="list-group-item list-group-item-dark">
                                           عنوان: {" "}
                                            <span className="fw-bold">
                                           {task.Title}
                                            </span>
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                           الویت: {" "}
                                            <span className="fw-bold">
                                          {task.Priority}
                                            </span>
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                            دسته بندی: {" "}
                                            <span className="fw-bold">
                                            {task.Category}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-1 col-sm-1 d-flex flex-column align-items-cneter">
                                    <Link to={`/tasks/${task.Id}`} className="btn my-1" style={{backgroundColor:ORANGE}}>
                                        <i className="fa fa-eye" />
                                    </Link>
                                    <Link to={`/tasks/edit/${task.Id}`} className="btn my-1" style={{backgroundColor:CYAN}}>
                                        <i className="fa fa-pen"/>
                                    </Link>
                                    <button className="btn my-1" style={{backgroundColor:RED}} onClick={confirmDelete}>
                                        <i className="fa fa-trash"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    );
};

export default Task;