import React from 'react';
import Home from '../src/Home';
import Speakers from '../src/Speakers';

const App = ({pageName}) => {
    if (pageName === 'Home') return <Home></Home>;
    if (pageName === 'Speakers') return <Speakers></Speakers>;
    return <div>Not found</div>
}

export default App;