
import {PURPLE} from '../../helpers/colors';
import { useContext } from "react";
import { TaskContext } from '../../context/taskContext';
const SearchTask = () => {
    // const {taskQuery,taskSearch}=useContext(TaskContext);
    const {taskSearch}=useContext(TaskContext);
    return (
        <div className="input-group mx-2 w-75" dir="ltr">
                            <span className="input-group-text" id="basic-addon1" style={{backgroundColor:PURPLE}}>
                            <i className="fas fa-search" />
                            </span>
                          
                            <input dir="rtl"
                            type = "text"
                            className="form-control"
                            // value={taskQuery.text}
                            onChange={(event) => taskSearch(event.target.value)}
                            placeholder="جست وجوی کار"
                            aria-label="Search"
                            aria-describedby="basic-addon1" />
                            
                           
                        </div>
    )
}
export default SearchTask;