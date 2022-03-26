import * as api from '../api'
import { AUTH, AUTHERR, START_LOADING, ISAUTH } from '../constants/actionType'

export const signin = (signInData, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.signIn(signInData)
        dispatch({ type: AUTH, data })
        navigate('/home')
    } catch (error) {
        dispatch({ type: AUTHERR, payload: error.response.data.message })
        console.log(error.response.data.message)
    }
}

export const signup = (signUpData, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.signUp(signUpData)
        dispatch({ type: AUTH, data })
        navigate('/home')
    } catch (error) {
        dispatch({ type: AUTHERR, payload: error.response.data.message })
        console.log(error.response.data.message)
    }
}
