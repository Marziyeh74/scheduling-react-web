
import {PURPLE} from '../../helpers/colors'
const SearchTask = ({query,search}) => {

    return (
        <div className="input-group mx-2 w-75" dir="ltr">
                            <span className="input-group-text" id="basic-addon1" style={{backgroundColor:PURPLE}}>
                            <i className="fas fa-search" />
                            </span>
                          
                            <input dir="rtl"
                            type = "text"
                            className="form-control"
                            value={query.text}
                            onChange={search}
                            placeholder="جست وجوی کار"
                            aria-label="Search"
                            aria-describedby="basic-addon1" />
                            
                           
                        </div>
    )
}
export default SearchTask;