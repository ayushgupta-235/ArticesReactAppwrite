import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice'

export const store = configureStore({
    //reducer : authReducer  --->>this is wrong
    reducer: {
        auth: authReducer, // ✅ authReducer must be inside an object with a key (e.g., "auth")
      },
})