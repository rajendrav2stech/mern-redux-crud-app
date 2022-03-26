import { TOOGLE_LEFT, TOOGLE_RIGHT } from "../constants/actionType"

const sidebarToggle = (state = { isToggle: false }, action) => {
    switch (action.type) {
        case TOOGLE_LEFT:
            return { ...state, isToggle: true }
        case TOOGLE_RIGHT:
            return { ...state, isToggle: false }
        default:
            return state
    }
}

export default sidebarToggle