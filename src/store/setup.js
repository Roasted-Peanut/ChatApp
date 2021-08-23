import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import whitelist from './whitelist';
import array from './array';
import promise from './promise';
import * as reducers from '../reducers';
import { createLogger } from 'redux-logger';
import {goAuth, goHome} from '../navigation/navigation';


export const storeObj ={};
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist, 
}
export default function setup (){
    const isDev = global.isDebuggingInChrome || __DEV__;
    const logger = createLogger();
    const middleware = [applyMiddleware(...[thunk, promise, array, logger])];

    if(isDev){
        middleware.push(
            applyMiddleware(require('redux-immutable-state-invariant').default()),
        )
    }

    const reducer = combineReducers(reducers);
    const persistedReducer = persistReducer(persistConfig, reducer);
    const store = createStore(persistedReducer, {}, compose(...middleware));

    persistStore(store, null, ()=>{
        console.log("newStore", store.getState());

        if(store.getState().user.isLoggedIn){
            goHome();
        }else if(store.getState().user.isIntroScreenWatched){
            goAuth();
        }
    })
    return store;
}