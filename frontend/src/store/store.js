import { configureStore, combineReducers, createReducer } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import authReducer from '../store/slices/authSlice';
import { injectStore } from "../middleware";

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    auth: authReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({ 
            serializableCheck: false, 
        }
    ),
}); 

injectStore(store); export default store;

export const persistor = persistStore(store);