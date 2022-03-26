import { FETCH_ALL, FETCH_POST, CREATE, UPDATE, DELETE, LIKEPOST, SEARCH_ALL, START_LOADING, END_LOADING } from '../constants/actionType'

export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case END_LOADING:
            return {
                ...state,
                isLoading: false
            }
        case FETCH_POST:
            return {
                ...state,
                post: action.payload
            }
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                curentNumber: action.payload.curentNumber,
                numberOfPage: action.payload.numberOfPage
            }
        case SEARCH_ALL:
            return {
                ...state,
                posts: action.payload
            }
        case LIKEPOST:
            return {
                ...state,
                posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))
            }
        case CREATE:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }
        case UPDATE:
            return {
                ...state,
                posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))
            }
        case DELETE:
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== action.payload)
            }
        default:
            return state;
    }
}