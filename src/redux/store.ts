import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import languageReducer from './language/reducer';
import tempReducer from './temp/reducer';
import userInformationReducer from './userInformation/reducer';

const rootReducer = combineReducers({
  tempReducer,
   languageReducer,
   userInformationReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['languageReducer', 'userInformationReducer'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

type RootState = ReturnType<typeof rootReducer>

const store = createStore(persistedReducer, applyMiddleware(thunk));

let persistor = persistStore(store); 
export {store, persistor, RootState};
