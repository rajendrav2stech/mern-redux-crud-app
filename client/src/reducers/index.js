import { combineReducers } from "redux"

import auth from './auth'
import posts from './posts'
import theme from './theme'
import sidebarToggle from './sidebarToggle'

export const reducers = combineReducers({
    posts: posts,
    auth: auth,
    theme: theme,
    sidebarToggle: sidebarToggle
})