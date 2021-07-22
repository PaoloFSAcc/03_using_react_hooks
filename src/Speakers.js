import React, {useEffect, useState, useContext, useReducer} from 'react';
import { Header } from './Header';
import { Menu } from './Menu';
import SpeakerData from './SpeakerData';
import SpeakerDetail from './SpeakerDetail';
import {ConfigContext} from './App';

const Speakers = ({}) => {

    const [speakingSaturday, setSpeakingSaturday] = useState(true);
    const [speakingSunday, setSpeakingSunday] = useState(true);

    const [speakerList, setSpeakerList] = useState([]);
    // This is a refactor of the same functionality as useState
    //const [speakerList, setSpeakerList] = useReducer((state, action)=> action, []);

    function speakersReducer(state, action) {
        switch(action.type) {
            case "setSpeakerList": {
                return action.data;
            }
            default:
                return state;
        }
    };

    //const [speakerList, dispatch] = useReducer(speakersReducer, []);

    const [isLoading, setIsLoading] = useState(true);

    const context = useContext(ConfigContext);

    useEffect(() => {
        setIsLoading(true);
        new Promise(function (resolve) {
          setTimeout(function () {
            resolve();
          }, 1000);
        }).then(() => {
          setIsLoading(false);
          const speakerListServerFilter = SpeakerData.filter(({ sat, sun }) => {
            return (speakingSaturday && sat) || (speakingSunday && sun);
          });
          setSpeakerList(speakerListServerFilter);
        });
        return () => {
          console.log('cleanup');
        };
      }, []); // [speakingSunday, speakingSaturday]);

    const handleCheckSaturday = () => {
        setSpeakingSaturday(!speakingSaturday);
    }
    const handleCheckSunday = () => {
        setSpeakingSunday(!speakingSunday);
    }

    const speakerListFiltered = isLoading ? [] :
        speakerList.filter(
            ({sat, sun}) => 
                (speakingSaturday && sat || speakingSunday && sun),
        ).sort( function(a,b) {
            if (a.firstName < b.firstName) {
                return -1;
            }
            if (a.firstName > b.firstName) {
                return 1;
            }
            return 0;
        })

    const heartFavoriteHandler = (e, favoriteValue) => {
        e.preventDefault();
        const sessionId = parseInt(e.target.attributes['data-sessionid'].value);
        setSpeakerList(
            speakerList.map((item) => {
            if (item.id === sessionId) {
                return { ...item, favorite: favoriteValue };
            }
            return item;
            }),
        );
        //console.log("changing session favorte to " + favoriteValue);
        };

    if (isLoading) {
        return <div>Loading</div>
    }
    return(
        <div>
            <Header/>
            <Menu/>
            <div className="container">
                <div className="btn-toolbar margintopbottom5 checkbox-bigger">
                    {context.showSpeakerSpeakingDays === false ? null : (
                    <div className="hide">
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    onChange={handleCheckSaturday}
                                    checked={speakingSaturday}
                                />
                                Saturday Speakers
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    onChange={handleCheckSunday}
                                    checked={speakingSunday}
                                />
                                Sunday Speakers
                            </label>
                        </div>
                    </div>
                    )}
                </div>
                <div className="row">
                    <div className="card-deck">
                        {speakerListFiltered.map(
                            ({id, firstName, lastName, bio, favorite}) => {
                                return(
                                    <SpeakerDetail
                                        key={id}
                                        id={id}
                                        favorite={favorite}
                                        firstName={firstName}
                                        lastName={lastName}
                                        bio={bio}
                                        onHeartFavoriteHandler={heartFavoriteHandler}
                                    />
                                );
                            }
                        )}                
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Speakers;