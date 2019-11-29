import * as React from "react";
import {useSelector} from "react-redux";
import {mainSelector} from "../actions";

interface IProps {
    selectedUser: number
}

const SelectedUser: React.FC<IProps> = ({selectedUser}) => {
    const {users} = useSelector(mainSelector);
    const user = users.find(user => user.id === selectedUser);
    if(!user) return <h1>USER NOT FOUND</h1>;
    return (
        <div className="row">
            <h1>{`${user.name}'s Profile`}</h1>

        </div>
    )
};

export default SelectedUser