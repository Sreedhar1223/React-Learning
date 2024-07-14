import {configureStore} from "@reduxjs/toolkit"
import loginReducer from "../Features/loginData"
export const store = configureStore({
    reducer:loginReducer
})