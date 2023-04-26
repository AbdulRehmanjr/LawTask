
import { createReducer, on } from '@ngrx/store';
import * as sellerActions from 'src/app/ngrx/actions/SellerRequestAction'
import { SellerRequestState } from '../types/SellerRequestState';


export const initialState: SellerRequestState = {
  isFetched: false,
  sellers: [],
  error: null,
};

export const SellerRequestReducer = createReducer(
  initialState,
  on(sellerActions.getAllSellerRequests, (state) => ({ ...state, isFetched: true })),
  on(sellerActions.getAllSellerRequestsSuccess, (state, action) => ({
    ...state,
    sellers: action.sellers
  })),
  on(sellerActions.getAllSellerRequestsError, (state, action) => ({
    ...state,
    isFetched: false,
    error: action.error,
  })),

);
