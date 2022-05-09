import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { createStore } from 'redux';
import rootReducer from '../reducers';


const persistConfig = {
 key: 'root',
 storage,
 stateReconciler: autoMergeLevel2 
};

// const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(rootReducer);

export default store;

