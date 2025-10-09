import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import globalSlice from './features/global';
import cartSlice from './features/cart';
import authSlice from './features/auth';

const persistConfig = {
	key: 'Sash King',
	storage,
	whitelist: ["global", "cart", "auth"],
	blacklist: [],
};

const combinedReducers = combineReducers({
	global: globalSlice.reducer,
	cart: cartSlice.reducer,
	auth: authSlice.reducer,
	
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;
