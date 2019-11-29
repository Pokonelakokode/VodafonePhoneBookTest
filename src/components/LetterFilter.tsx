import * as React from "react";
import Letter from "./Letter";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "../reducers";
import {setPageState} from "../actions/pageState";

const LetterFilter:React.FC = () => {
    const {users,pageState:{letterFilter}} = useSelector((state:RootState) => state);
    const dispatch = useDispatch();
    const selectLetter = (letter:string) => dispatch(setPageState("letterFilter", letter));
    const letters = users
        .reduce((letters: string[], user) => {
            if (!letters.includes(user.name.charAt(0))) letters.push(user.name.charAt(0));
            return letters
        }, [])
        .sort((a, b) => a.localeCompare(b));
    return (
        <div className="col-12 letters">
            {letters.map(letter => (
                <Letter
                    key={letter}
                    selected={letterFilter === letter}
                    letter={letter.toUpperCase()}
                    selectLetter={selectLetter}
                />
            ))}
        </div>
    )
};

export default LetterFilter