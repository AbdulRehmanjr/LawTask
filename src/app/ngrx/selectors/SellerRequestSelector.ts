import { createSelector } from "@ngrx/store"
import { appState } from "../states/appState"
import { SellerRequestState } from "../types/SellerRequestState"




export const selectFeature = (state:appState)=>{
    return state['sellerRequests']
}

export const sellerRequestIsFetchedSeletor =  createSelector(selectFeature,(state : SellerRequestState)  =>
state['isFetched']
)

export const sellerRequestSelector = createSelector(selectFeature,(state)  =>state['sellers'])


export const errorSelector = createSelector(selectFeature,(state)  =>state['error'])
