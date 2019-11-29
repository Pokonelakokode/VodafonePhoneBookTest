import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {mainSelector} from "../actions";
import {setPageState} from "../actions/pageState";

interface IProps {
}

const SearchBar: React.FC<IProps> = () => {
    const {pageState:{search}} = useSelector(mainSelector);
    const dispatch = useDispatch();
    const setSearch = (e:React.ChangeEvent<HTMLInputElement>) => dispatch(setPageState("search", e.target.value));
    return (
        <div className="col-12 col-md-6 search-bar">
            <input
                type="text"
                className="form-control"
                placeholder="Search for contact"
                value={search}
                onChange={setSearch}
            />
        </div>

    )
};

export default SearchBar