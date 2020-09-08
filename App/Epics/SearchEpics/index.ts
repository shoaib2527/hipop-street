import { of } from "ramda"
import { Epic, ofType } from "redux-observable"
import { mergeMap } from "rxjs/operators"
import { getType } from "typesafe-actions"
import { IDependencies } from "../../Reducers/CreateStore"
import { SearchAction } from "../../Reducers/SearchReducer"

export const searchEpic: Epic = (action$, state$, { api }: IDependencies) => action$.pipe(
    ofType(getType(SearchAction.searchRequest)),
    mergeMap((action) => {
        return api.hiphop.search(action.payload).pipe(
            mergeMap((response) => {
                if (response.ok) {
                    return of(SearchAction.searchSuccess(response.data.data))
                } else {
                    return of(SearchAction.searchFailure())
                }
            })
        )
    })
)