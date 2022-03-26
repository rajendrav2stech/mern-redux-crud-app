import { DARK_MODE, LIGHT_MODE } from "../constants/actionType"

const themeReducer = (state = { bgColor: 'white', isLight: false }, action) => {
    switch (action.type) {
        case LIGHT_MODE:
            return { ...state, bgColor: 'white', isLight: false }
        case DARK_MODE:
            return { ...state, bgColor: 'dark-mode ', isLight: true }
        default:
            return state
    }
}

export default themeReducer