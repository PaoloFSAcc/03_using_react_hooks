import React from 'react';
import Home from '../src/Home';
import Speakers from '../src/Speakers';

export const ConfigContext = React.createContext();

const pageToShow = pageName => {
    if (pageName === 'Home') return <Home></Home>;
    if (pageName === 'Speakers') return <Speakers></Speakers>;
    return <div>Not found</div>
};

const configValue = {
    showSignMeUp : true,
    showSpeakerSpeakingDays: true
};

const App = ({pageName}) => {
    return (
        <ConfigContext.Provider value={configValue}>
             <div>{pageToShow(pageName)}</div>
        </ConfigContext.Provider>
    );
};

export default App;