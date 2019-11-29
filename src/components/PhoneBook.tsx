import * as React from "react";
import { useEffect} from "react";
import {getHash} from "../utils";
import {useDispatch, useSelector} from "react-redux";
import {mainSelector} from "../actions";
import {selectUser, setPageState} from "../actions/pageState";
import NewUser from "./NewUser";
import { bindActionCreators } from "redux";
import {router} from "./router";

function PhoneBook() {
    const {pageState:{selectedUser}} = useSelector(mainSelector);
    const actions = bindActionCreators({setPageState,selectUser},useDispatch());
    useEffect(() => {
        const fn = () => actions.setPageState("selectedUser", parseInt(getHash().user) || null);
        window.addEventListener('popstate', fn);
        return () => window.removeEventListener('popstate', fn);
    },[]);
    const [header,content] = router(selectedUser);
    return (
        <div className="container">
            <div className="header row align-items-center">
                {header}
            </div>
            {content}
            <NewUser newUser={() => actions.selectUser(-1)}/>
        </div>
    )
}

export default PhoneBook