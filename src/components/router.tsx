import Edit from "./SelectedUser/Edit";
import Logo from "./Logo";
import * as React from "react";
import SearchBar from "./SearchBar";
import Contacts from "./Contacts";
import LetterFilter from "./LetterFilter";
import {ReactNode} from "react";

export function router (selectedUser:number | null):ReactNode[]{
    let content,header;
    if(selectedUser !== null){
        content = <Edit selectedUser={selectedUser}/>;
        header = <Logo imgSrc={"vodafone_logo.svg"}/>
    }
    else {
        header = <React.Fragment>
            <Logo imgSrc={"vodafone_logo.svg"}/>
            <SearchBar/>
        </React.Fragment>;
        content = <React.Fragment>
            <h2 className="col-12 text-center">Contacts</h2>
            <LetterFilter/>
            <Contacts/>
        </React.Fragment>
    }
    return [header,content]

}