import * as React from "react";
import UserComponent  from "./User";
import {useSelector} from "react-redux";
import { RootState } from "../reducers";


const Contacts:React.FC = () => {
    const {users,pageState:{letterFilter,search}} = useSelector((state:RootState) => state);
    const matcher = new RegExp(search,'gi');
    return (
        <div className="row" id="Contacts">
            {users
                .filter(user => letterFilter ? user.name.charAt(0) === letterFilter : true)
                .filter(user => user.name.match(matcher) || user.phone.match(matcher) || user.email.match(matcher))
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(user => <UserComponent id={user.id} key={user.id} name={user.name} email={user.email} phone={user.phone} />)}
        </div>
    )
};

export default Contacts