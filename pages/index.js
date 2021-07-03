import React, {useEffect, useState} from 'react';

const InputElement = () => {

    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000);
    });
    return (
        isLoading ?
        <div>Is Loading</div> :
        <>
            <input placeholder = "Enter some text"/>                      
        </>
    );
};

export default InputElement; 