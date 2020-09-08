import { of } from "rxjs";
import { Epic, ofType } from "redux-observable"
import { mergeMap } from "rxjs/operators"
import { getType } from "typesafe-actions";
import { IDependencies } from "../../Reducers/CreateStore";
import { MySongAction } from "../../Reducers/MySongsReducer";
import { SongsActions } from "../../Reducers/SongsReducer";
import { Alert } from "react-native";

export const getMySongsEpic: Epic = (action$, state$, { api }: IDependencies) => action$.pipe(
    ofType(getType(MySongAction.getMySongsRequest)),
    mergeMap((action) => {
        return api.hiphop.getMySongs(state$.value.login.userData.access_token).pipe(
            mergeMap((response) => {
                if (response.ok) {
                    return of(MySongAction.getMySongsSuccess(response.data.data), SongsActions.setPlaylist(response.data.data))
                } else {
                    return of(MySongAction.getMySongsFailure())
                }
            })
        )
    })
)

export const uploadMySongEpic: Epic = (action$, state$, { api }: IDependencies) => action$.pipe(
    ofType(getType(MySongAction.uploadMySongReq)),
    mergeMap((action) => {
        return api.hiphop.uploadSong(state$.value.login.userData.access_token, action.payload).pipe(
            mergeMap((response) => {
                // if(response.data){
                // response.data.object.error && Alert.alert("Error", response.data.object.error);
                // };
                if (response.ok) {
                    return of(MySongAction.uploadMySongSuccess(), MySongAction.getMySongsRequest())
                } else {
                    Alert.alert("Error", "An error occured uploading your song, please check your internet connection or try again later")
                    console.log("at error");
                    return of(MySongAction.uploadMySongFailure())
                }
            })
        )
    })
)