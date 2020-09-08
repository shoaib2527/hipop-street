import RNTrackPlayer from "react-native-track-player";

// service.js
module.exports = async function () {
    // This service needs to be registered for the module to work
    // but it will be used later in the "Receiving Events" section
    RNTrackPlayer.addEventListener("remote-pause", (event) => {
        console.log("#DEBUG remote pause #", event);
        RNTrackPlayer.pause();
    });
}