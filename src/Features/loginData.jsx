import {createSlice,nanoid} from "@reduxjs/toolkit"


const initialState = {
    loginData:null
}

export const loginSlice = createSlice({
    name:'login',
    initialState,
    reducers:{
       addUserData:(state,action)=>{
         const userData = {
          id: nanoid(),
          text:action.payload
         }
         state.loginData = userData
       },
       removeUserData:(state,action) =>{
           state.loginData = state.loginData.filter((user) => user.id !== action.payload)
       }
    }
})


export const {addUserData,removeUserData} = loginSlice.actions

export default loginSlice.reducer