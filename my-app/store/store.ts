import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {categoryApi} from "@/store/apis/categoryApi";
import {authApi} from "@/store/apis/authApi";
import authReducer from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(categoryApi.middleware)
            .concat(authApi.middleware),

})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;