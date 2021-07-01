import React from 'react';
import ImageToggleOnMouseOver from '../src/ImageToggleOnMouseOver';

const ImageChangeOnMouseOver = () => {
    return(
        <div>
            ppp
            <ImageToggleOnMouseOver
                primaryImg="/static/speakers/bw/Speaker-187.jpg"
                secondaryImg="/static/speakers/Speaker-187.jpg"
                alt="">
            </ImageToggleOnMouseOver>
            
            &nbsp;&nbsp;&nbsp;
            
            <ImageToggleOnMouseOver
                primaryImg="/static/speakers/bw/Speaker-1124.jpg"
                secondaryImg="/static/speakers/Speaker-1124.jpg"
                alt=""
            >
             </ImageToggleOnMouseOver>
        </div>
    );

};

export default ImageChangeOnMouseOver;