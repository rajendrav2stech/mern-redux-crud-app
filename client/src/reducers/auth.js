import { AUTH, LOGOUT, AUTHERR, START_LOADING, END_LOADING, ISAUTH } from '../constants/actionType'

// const initial = {
//     // isLoading: false,
//     // isAuth: false,
//     // error: "",

// }

const authReducer = (state = { authData: null, isLoading: false, isAuth: false }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true }
        case ISAUTH:
            return { ...state, isAuth: true }
        case END_LOADING:
            return { ...state, isLoading: false, isAuth: true }
        case AUTH:
            sessionStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            localStorage.setItem('theme', false)
            return { ...state, authData: action?.data, isLoading: false, isAuth: true }
        case AUTHERR:
            return { ...state, error: action.payload, isLoading: false, isAuth: false }
        case LOGOUT:
            localStorage.clear()
            sessionStorage.clear()
            return { ...state, authData: null, isLoading: false, isAuth: false }
        default:
            return state
    }
};

export default authReducer