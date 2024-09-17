import { Link } from "react-router-dom";
import { CURRENTLINE, CYAN, ORANGE, PURPLE,RED } from "../../helpers/colors";
const Task = ({task,confirmDelete}) => {

    return (
        <div className="col-md-6">
                    <div style={{backgroundColor:CURRENTLINE}} className="card my-2">
                        <div className="card-body">
                            <div className="row align-items-center justify-content-around">
                                <div className="col-md-4 col-sm-4">
                                    <img src="https://placehold.co/600x400" alt="" style={{border:`1px solid ${PURPLE}`}}
                                    className="img-fluid rounded"
                                    />
                                </div>
                                <div className="col-md-7 col-sm-7">
                                    <ul className="list-group">
                                        <li className="list-group-item list-group-item-dark">
                                           عنوان: {" "}
                                            <span className="fw-bold">
                                           {task.title}
                                            </span>
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                           الویت: {" "}
                                            <span className="fw-bold">
                                          {task.priority}
                                            </span>
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                            دسته بندی: {" "}
                                            <span className="fw-bold">
                                            {task.category}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-1 col-sm-1 d-flex flex-column align-items-cneter">
                                    <Link to={`/tasks/${task.id}`} className="btn my-1" style={{backgroundColor:ORANGE}}>
                                        <i className="fa fa-eye" />
                                    </Link>
                                    <Link to={`/tasks/edit/${task.id}`} className="btn my-1" style={{backgroundColor:CYAN}}>
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