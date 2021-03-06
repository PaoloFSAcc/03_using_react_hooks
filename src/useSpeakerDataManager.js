import React, { useEffect, useReducer, useContext } from "react";
import SpeakerData from "./SpeakerData";
import speakersReducer from "./speakersReducer";
import axios from "axios";

import { InitialSpeakersDataContext } from "../pages/speakers";

function useSpeakerDataManager() {
    const initialSpeakerData = useContext(InitialSpeakersDataContext);
    const [{ isLoading, speakerList }, dispatch] = useReducer(speakersReducer, {
        isLoading: false,
        speakerList: initialSpeakerData,
    });

    function toggleSpeakerFavorite(speakerRec) {
        const updateData = async function () {
            axios.put(`/api/speakers/${speakerRec.id}`, {
                ...speakerRec,
                favorite: !speakerRec.favorite,
            });
            speakerRec.favorite == true
                ? dispatch({ type: "unfavorite", id: speakerRec.id })
                : dispatch({ type: "favorite", id: speakerRec.id });
        };
        updateData();
    }

    useEffect(() => {
        // new Promise(function (resolve) {
        //     setTimeout(function () {
        //         resolve();
        //     }, 1000);
        // }).then(() => {
        //     //setSpeakerList(speakerListServerFilter);
        //     dispatch({
        //         type: "setSpeakerList",
        //         data: SpeakerData,
        //     });
        // });
        const fetchData = async function () {
            let result = await axios.get("/api/speakers");
            dispatch({ type: "setSpeakerList", data: result.data });
        };
        fetchData();

        return () => {
            console.log("cleanup");
        };
    }, []); // [speakingSunday, speakingSaturday]);

    return { isLoading, speakerList, toggleSpeakerFavorite };
}

export default useSpeakerDataManager;
