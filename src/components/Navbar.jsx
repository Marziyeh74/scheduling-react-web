import SearchTask from "./Tasks/SearchTask";
import {PURPLE,BACKGROUND} from '../helpers/colors';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Colorfull from "../hoc/Colorfull";
const Navbar = () => {
   const location = useLocation();
    return (

        <nav className="navbar navbar-dark navbar-expand-sm shadow-lg"
        // style={{backgroundColor:BACKGROUND}}
        >
            <div className="container">
                <div className="row w-100">
                    <div className="col">
                        <div className="navbar-brand">
                            <i className="fas fa-id-badge" style={{color:PURPLE}}/>{" "}
                            وب اپلیکیشن{" "}
                            <span style={{color:PURPLE}}>مدیریت برنامه ریزی و یادداشت</span>
                        </div>
                    
                    </div>
                    <div className="col">
                        <Link to={"/callUs"} className="float-start" reloadDocument>
                              call us

                            
                            </Link>
                    </div>
                    {location.pathname=== "/tasks" ? (
                            <div className="col">
                            <SearchTask />
                        </div>
                    ): null}
                    
                   
                </div>
            </div>
        </nav>
    )
}

export default Colorfull(Navbar);

