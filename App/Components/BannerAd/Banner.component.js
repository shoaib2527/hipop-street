import React from 'react';
import firebase from 'react-native-firebase';
import { Platform } from 'react-native'
const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
request.addKeyword('foobar');
const BANNERID = Platform.OS == 'ios' ? "ca-app-pub-5865232026493005/6091416462"
    : "ca-app-pub-5865232026493005/7806811057";
export default function BannerComponent() {
    return (
        <Banner
            unitId={BANNERID}
            size={"FULL_BANNER"}
            request={request.build()}
        />
    )
}
