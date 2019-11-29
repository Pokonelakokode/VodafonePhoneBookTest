import * as React from "react";
import { bindActionCreators } from "redux";
import {selectUser} from "../actions/pageState";
import {useDispatch} from "react-redux";

interface IProps {
    imgSrc: string
}

const Logo: React.FC<IProps> = ({imgSrc}) => {
    const actions = bindActionCreators({selectUser},useDispatch());
    return (
        <div className="col-12 col-md-6 pointer-cursor">
            <img onClick={() => actions.selectUser(null)} className="logo" src={imgSrc} />
        </div>
    )
};

export default Logo