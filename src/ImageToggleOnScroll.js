import React, {useState, useEffect, useRef} from 'react';

const ImageToggleOnScroll = ({primaryImg, secondaryImg}) => {
    
    const imageRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    const isInView = () => {
        const rect = imageRef.current.getBoundingClientRect();
        let temp = rect.top >= 0 && rect.bottom <= window.innerHeight;
        return temp;
    }

    const [inView, setInView] = useState(false);

    useEffect(() => {
        setIsLoading(false);
        setInView(isInView());
        window.addEventListener("scroll", scrollHandler);
        return () => {
            console.log("in ");
            window.removeEventListener("scroll", scrollHandler);
        };
    }, []);

    const scrollHandler = () => {
        setInView(isInView());
    };

    return (
        <img
            src={
                isLoading ? 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==' : // 1x1gif
                inView ? secondaryImg : primaryImg}
            alt=""
            ref={imageRef}
            width="200"
            height="200"
            />
    ); 
};

export default ImageToggleOnScroll;