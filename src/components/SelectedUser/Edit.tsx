import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {mainSelector} from "../../actions";
import {addUser, deleteUser, getUserOrNew, saveUser} from "../../actions/users";
import {bindActionCreators} from "redux";
import {selectUser} from "../../actions/pageState";
import {validateEmail} from "../../utils";

interface IProps {
    selectedUser: number
}


const Edit: React.FC<IProps> = ({selectedUser}) => {
    if(selectedUser === null) return <h1>No such user</h1>;
    const {users} = useSelector(mainSelector);
    const actions = bindActionCreators({saveUser, addUser, selectUser, deleteUser}, useDispatch());

    const [user, setUser] = useState(getUserOrNew(users, selectedUser)[0]);
    const [edit, setEdit] = useState(!user.id);
    useEffect(() => {
        let [user, isNew] = getUserOrNew(users, selectedUser);
        setUser(user);
        setEdit(isNew);
    }, [selectedUser]);
    const editCancel = () => {
        if (edit) setUser(getUserOrNew(users, selectedUser)[0]);
        setEdit(!edit);
    };
    const _deleteUser = () => {
        if (confirm(`Are you sure you want to delete ${user.name} from contacts?`)) {
            actions.deleteUser(user.id);
            actions.selectUser(null)
        }
    };
    const nameValid = user.name.length > 0;
    const emailValid = validateEmail(user.email);
    const phoneValid = user.phone.length >= 7;
    const _saveUser = () => {
        let isNew: boolean;
        if(!nameValid || !emailValid || !phoneValid) return alert("Some of your data is invalid");
        [user.id, isNew] = !user.id ? [users.reduce((max: number, _user) => _user.id > max ? _user.id : max, -1) + 1, true] : [user.id, false];
        if (isNew) {
            actions.addUser(user);
            actions.selectUser(user.id);
        } else {
            actions.saveUser(user);
        }
        setEdit(false);
    };

    return (
        <div>
            <h1 className="text-center">{!user.id ? "Add New Contact" : `${edit ? "Edit " : ""}${user.name}'s Profile`}</h1>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                    <input value={user.name}
                           placeholder="Enter Name"
                           readOnly={!edit} type="text"
                           className={`${nameValid ? "" : "is-invalid "}form-control`}
                           required
                           onChange={(e) => setUser({...user, name: e.target.value})}
                    />
                    {!nameValid && <div className="invalid-feedback d-block">Name is too short</div>}
                </div>

            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                    <input value={user.email}
                           placeholder="Enter Email"
                           readOnly={!edit} type="email"
                           className={`${emailValid ? "" : "is-invalid "}form-control`}
                           onChange={(e) => setUser({...user, email: e.target.value})}
                    />
                    {!emailValid && <div className="invalid-feedback d-block">Email address is invalid</div>}
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Phone</label>
                <div className="col-sm-10">
                    <input value={user.phone} placeholder="Enter Phone"
                           readOnly={!edit} type="text"
                           required
                           className={`${phoneValid ? "" : "is-invalid "}form-control`}
                           onChange={(e) => setUser({...user, phone: e.target.value})}
                    />
                    {!phoneValid && <div className="invalid-feedback d-block">Phone number have to be at least 7 digits</div>}
                </div>
            </div>
            <div className="row justify-content-around">
                {user.id &&
                <button onClick={editCancel} className="btn btn-primary">{edit ? "Cancel" : "Edit"}</button>}
                <button onClick={() => actions.selectUser(null)} className="btn btn-primary">Back</button>
                {edit ?
                    <button onClick={_saveUser} className="btn btn-danger">{user.id ? "Save" : "Create"}</button>
                    :
                    user.id && <button onClick={_deleteUser} className="btn btn-danger">Delete</button>
                }
            </div>

        </div>
    )
};

export default Edit