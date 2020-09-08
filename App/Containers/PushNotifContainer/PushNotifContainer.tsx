import React, { Component } from "react";
import { Platform, Alert } from "react-native";
// import PushNotification from "react-native-push-notification";
import firebase from 'react-native-firebase'


// var PushNotification = require("react-native-push-notification");

export default class PushNotifContainer extends Component {

  // componentDidMount() {
  //   PushNotification.configure({
  //     // (optional) Called when Token is generated (iOS and Android)
  //     onRegister: function (token) {
  //       console.log("token firebase", token)
  //     },

  //     // (required) Called when a remote or local notification is opened or received
  //     onNotification: function (notification) {
  //       console.log("notification", notification);

  //       // process the notification here

  //       // required on iOS only 
  //       //   notification.finish(PushNotificationIOS.FetchResult.NoData);
  //     },
  //     // Android only
  //     senderID: "591629993468",
  //     // iOS only
  //     permissions: {
  //       alert: true,
  //       badge: true,
  //       sound: true
  //     },
  //     popInitialNotification: true,
  //     requestPermissions: true
  //   })
  // }

  async componentDidMount() {
    this.registerAppWithFCM()
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      // alert(fcmToken)
      console.log("==================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", fcmToken)
      // user has a device token

    } else {
      // user doesn't have a device token yet
      // alert(fcmToken)

    }
    firebase.notifications().onNotification((notification) => {
      console.log(notification)
      firebase.notifications().displayNotification(notification)
    })
    firebase.messaging().onMessage((Hello) => {
      console.log("Message Recieving ======>>>>>>>>", Hello)
    })
  }

  registerAppWithFCM() {
    firebase.messaging().requestPermission()
      .then(() => {
        // User has authorised  
        console.log("================?????????????????????=====grandted")
      })
      .catch(error => {
        // User has rejected permissions  
        console.log("permissio denied", error)
      });
  }


  render() {
    return null;
  }
}