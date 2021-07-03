import React, {useState, useEffect} from 'react';
import ImageToggleOnScroll from '../src/ImageToggleOnScroll';

const ImageChangeOnMouseOver = () => {
    
    const [currentSpeakerId, setCurrentSpeakerId] = useState(0);
    const [mouseEventCount, setMouseEventCount] = useState(0);
     

    useEffect(() => {
        window.document.title = `SpeakerId: ${currentSpeakerId}`;
        console.log(`useEffect: setting title to ${currentSpeakerId}`);
    }, [currentSpeakerId]);

    return(
        <div>
            <span>Mouse event count: {mouseEventCount}</span>
            {[1124, 187, 823, 1269, 1530].map((speakerId) => {
                return(
                    <div
                        key={speakerId}
                        onMouseOver={() => {
                            setCurrentSpeakerId(speakerId);
                            setMouseEventCount(mouseEventCount + 1);
                            console.log(speakerId);
                        }}
                    >
                        <ImageToggleOnScroll
                            primaryImg={`/static/speakers/bw/Speaker-${speakerId}.jpg`}
                            secondaryImg={`/static/speakers/Speaker-${speakerId}.jpg`}
                            alt=""
                        />
                    </div>
                );
            })}
        </div>
    );

};

export default ImageChangeOnMouseOver;