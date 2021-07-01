import React, { useEffect, useState } from 'react';

const Syntax = () => {
    
    const [checkBoxValue, setCheckBoxValue] = useState(false);

    useEffect( () => {
        console.log("in useEffect");
        
        return (
            ()=> {
                console.log("in useEffect Cleanup")
            }
        );
    }, [checkBoxValue]); //The second parameter is a list of dependencies
    // if left out, it will execute the same function on first render and subsequent updates
    // if empty, only will be used in the first render
    // if want to render on different conditions, list values on which it will depend.
    // If any of those change, rerender

    return(
        <div></div>
    );
};

export default Syntax;