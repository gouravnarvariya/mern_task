import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../api/Api";

const initialState = {
    userData : {pending:true, data:null, error:null},
    signUpData : {pending:true, data:null, error:null}
}

export const UserLogin = createAsyncThunk("login", async (data) => {
    try {
        const response = await Api.post('auth/login', data)
        console.log(response)
        return response
    } catch(error) {
        return error
    } 
})

export const UserSignup = createAsyncThunk("signup", async (data) => {
    try {
        const response = await Api.post('auth/signup', data)
        console.log(response)
        return response
    } catch(error) {
        return error
    } 
})



const UserSlice = createSlice({
    name:"user",
    initialState:initialState,
    reducers : {
        logout : (state,action) => {
            localStorage.clear()
            state.userData.data = null
        }
    },
    extraReducers : (builder) => {
            builder 
            .addCase(UserLogin.pending, (state, action) => {
                state.userData.pending = true
            })
            .addCase(UserLogin.fulfilled, (state, action) => {
                console.log(action.payload)

                state.userData.pending = false
                if(action.payload.token) {
                    state.userData.data = action.payload;
                } else {
                    state.userData.error = action.payload.response.data.message
                }
                
            })
            .addCase(UserLogin.rejected, (state, action) => {
                console.log(action.payload)
                state.userData.pending = false
                state.userData.error= action.error
            })


            .addCase(UserSignup.pending, (state, action) => {
                state.userData.pending = true
            })
            .addCase(UserSignup.fulfilled, (state, action) => {
                console.log(action.payload)
                state.signUpData.pending = false
                if(action.payload.token) {
                    state.signUpData.data = action.payload;
                } else {
                    state.signUpData.error = action.payload.response.data.message
                }
                
            })
            .addCase(UserSignup.rejected, (state, action) => {
                console.log(action.payload)
                state.signUpData.pending = false
                state.signUpData.error= action.error
            })

    }
})

export const {logout} = UserSlice.actions

export default UserSlice.reducer