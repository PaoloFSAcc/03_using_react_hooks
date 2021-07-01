import React, {useRef} from 'react';

const ImageToggleOnMouseOver = ({primaryImg, secondaryImg}) => {
    
    const imageRef = useRef(null);

    const auxMouseOver = () => {
        imageRef.current.src = secondaryImg;
    };
    const auxMouseOut = () => {
        imageRef.current.src = primaryImg;
    };

    return (
        <img
            onMouseOver={auxMouseOver}
            onMouseOut={auxMouseOut}
            src={primaryImg}
            alt=""
            ref={imageRef}
            />
    );
};

export default ImageToggleOnMouseOver;