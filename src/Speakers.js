import React, { useState, useContext, useCallback, useMemo } from "react";
import { Header } from "./Header";
import { Menu } from "./Menu";
import SpeakerDetail from "./SpeakerDetail";
import { ConfigContext } from "./App";
import useSpeakerDataManager from "./useSpeakerDataManager";

const Speakers = ({}) => {
    const [speakingSaturday, setSpeakingSaturday] = useState(true);
    const [speakingSunday, setSpeakingSunday] = useState(true);
    const context = useContext(ConfigContext);

    const {
        isLoading,
        speakerList,
        toggleSpeakerFavorite,
    } = useSpeakerDataManager();

    const handleCheckSaturday = () => {
        setSpeakingSaturday(!speakingSaturday);
    };
    const handleCheckSunday = () => {
        setSpeakingSunday(!speakingSunday);
    };

    const newSpeakersList = useMemo(
        () =>
            speakerList
                .filter(
                    ({ sat, sun }) =>
                        (speakingSaturday && sat) || (speakingSunday && sun)
                )
                .sort(function (a, b) {
                    if (a.firstName < b.firstName) {
                        return -1;
                    }
                    if (a.firstName > b.firstName) {
                        return 1;
                    }
                    return 0;
                }),
        [speakingSaturday, speakingSunday, speakerList]
    );

    const speakerListFiltered = isLoading ? [] : newSpeakersList;

    const heartFavoriteHandler = useCallback((e, speakerRec) => {
        e.preventDefault();
        toggleSpeakerFavorite(speakerRec);
        // dispatch({
        //     type: favoriteValue === true ? 'favorite' : 'unfavorite',
        //     id: sessionId,
        // });
        // setSpeakerList(
        //     speakerList.map((item) => {
        //     if (item.id === sessionId) {
        //         return { ...item, favorite: favoriteValue };
        //     }
        //     return item;
        //     }),
        // );
        // //console.log("changing session favorte to " + favoriteValue);
    }, []);

    if (isLoading) {
        return <div>Loading</div>;
    }
    return (
        <div>
            <Header />
            <Menu />
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
                        {speakerListFiltered.map((speakerRec) => {
                            return (
                                <SpeakerDetail
                                    key={speakerRec.id}
                                    speakerRec={speakerRec}
                                    onHeartFavoriteHandler={
                                        heartFavoriteHandler
                                    }
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Speakers;
