import * as React from "react";

interface IProps {
    letter: string
    selected: boolean
    selectLetter(letter:string):void
}

const Letter: React.FC<IProps> = ({letter,selectLetter,selected}) => {
    return (
        <div onClick={() => {selected ? selectLetter("") : selectLetter(letter)}} className={`${selected ? "selected " : ""}letter-selector`}>
            {letter}
        </div>
    )
};

export default Letter