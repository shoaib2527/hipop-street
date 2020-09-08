import Share from "react-native-share";
import { Toast } from "native-base";
import { shorten, setKey } from "react-native-google-shortener";


// export const shareSong = (item: any) => {
//     let urlParam = [];
//     let shareUrl = "";
//     for (let i in item) {
//         urlParam.push(encodeURI(i) + "=" + encodeURI(item[i]))
//     }
//     // console.log(shorten);
//     shareUrl = `http://app.hiphopstreets.com/song?${urlParam.join("&")}`;
//     setKey("AIzaSyCDJLIQ-qeKlvUDfxokL2W4OCIfmD77pM0");
//     shorten("https://mgufron.com").then(response => {
//         console.log('shorten url', response.id);
//         console.log('long url', response.longUrl);
//         Share.open({
//             url: shareUrl, title: "HiphopStreets",
//             message: "Hey, check out this song on Hiphop Streets!"
//         }).then((res) => {
//             console.log(res);
//             Toast.show({ text: "Song shared successfully!" });
//         }).catch((err) => console.log("at error", err))
//     }).catch((e) => console.log(e))
// }