import * as React from "react";
import {PageStateActions} from "../actions/pageState";

interface IProps {
    newUser():PageStateActions['SET']
}

const NewUser: React.FC<IProps> = ({newUser}) => {
    return (
        <div onClick={newUser} className="pointer-cursor" id="NewContact">+</div>
    )
};

export default NewUser