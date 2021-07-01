import React, {useState} from 'react';

//
//Simple program that repeats what was input in a list with the history
//
const InputElement = () => {

    const [inputText, setinputText] = useState("");
    const [historyList, setHistoryList] = useState([])
    const auxFunction = (e) => {
            const newInputText = e.target.value;
            setinputText(newInputText);
            setHistoryList([...historyList, newInputText]);
        }
    
    return (
        <>
            <input
                onChange={auxFunction}
                placeholder = "Enter some text"
            />
            <p>{inputText}</p>
            <hr/>
            <br/>
            <ul>
            {historyList.map((history) => <div>{history}</div>)}
            </ul>
            
        </>
    );
};

export default InputElement;