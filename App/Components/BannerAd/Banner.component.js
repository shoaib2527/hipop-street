import React from 'react';
import firebase from 'react-native-firebase';
const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
request.addKeyword('foobar');
const BANNERID = "ca-app-pub-3940256099942544/6300978111";
export default function BannerComponent() {
    return (
        <Banner
            unitId={BANNERID}
            size={"FULL_BANNER"}
            request={request.build()}
        />
    )
}
