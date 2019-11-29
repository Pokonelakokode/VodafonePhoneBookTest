import * as React from "react";
import {useDispatch} from "react-redux";
import {PageStateActions, selectUser} from "../actions/pageState";

type Props = {
    name: string,
    email: string,
    phone: string
    id: number
}

function User({name, email, phone,id}: Props) {
    const dispatch = useDispatch();
    const setUser = () => dispatch<PageStateActions['SET']>(selectUser(id));
    return (
        <div className="col-12 col-md-6 col-lg-4 text-center pt-2" onClick={setUser}>
            <div className="user-card">
                <div className="header">
                    <h5 className="col-12">{name}</h5>
                </div>
                <div>
                    <p>{email}</p>
                    <p>{phone}</p>
                </div>
            </div>
        </div>
    )
}

export default User