import { Epic, ofType } from "redux-observable";
import { getType } from "typesafe-actions";
import { mergeMap } from "rxjs/operators";
import { IDependencies } from "../../Reducers/CreateStore";
import { of } from "rxjs";
import { FavoriteAction } from "../../Reducers/FavoritesReducer";
import { ApiResponse } from "apisauce";
import { SongsActions } from "../../Reducers/SongsReducer";
import { Toast } from "native-base";

export const getFavoritesEpic: Epic = (action$, state$, {api}: IDependencies) => action$.pipe(
    ofType(getType(FavoriteAction.getFavoriteRequest)),
    mergeMap((action) =>{
        return api.hiphop.getFavoriteSongs(state$.value.login.userData.access_token).pipe(
            mergeMap((response: ApiResponse<any>) => {
                if(response.ok && response.data.status === 200){
                    return action.payload ?
                    of(FavoriteAction.getFavoriteSuccess(response.data.data), SongsActions.setPlaylist(response.data.data)) : 
                    of(FavoriteAction.getFavoriteSuccess(response.data.data))
                } else{
                    return of(FavoriteAction.getFavoriteFailure())
                }
            })
        )
    })
) 



export const makeFavoritesEpic: Epic = (action$, state$, {api}: IDependencies) => action$.pipe(
    ofType(getType(FavoriteAction.makeFavoriteRequest)),
    mergeMap((action) =>{
        return api.hiphop.makeFavorite(action.payload, state$.value.login.userData.access_token).pipe(
            mergeMap((response: ApiResponse<any>) => {
                if(response.ok && response.status === 200){
                    Toast.show({text: response.data.message.message === "Success: Unliked!" ? "Song removed from favorites list!"
                    : "Song added to favorites list!"}) 
                    return of(FavoriteAction.makeFavoriteSuccess(), FavoriteAction.getFavoriteRequest(false))
                } else{
                    return of(FavoriteAction.makeFavoriteFailure())
                }
            })
        )
    })
) 