import * as api from '../api'
import { FETCH_ALL, FETCH_POST, CREATE, UPDATE, DELETE, LIKEPOST, SEARCH_ALL, START_LOADING, END_LOADING } from '../constants/actionType'
// ACTION CREATOR


export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPost(id)
        dispatch({ type: FETCH_POST, payload: data })
        console.log(data)
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error)
    }
}


export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPosts(page)

        dispatch({ type: FETCH_ALL, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error)
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    let controller
    //Check if there are any previous pending requests
    if (typeof controller != typeof undefined) {
        // cancel the request
        controller.abort()
    }
    controller = new AbortController()
    try {
        dispatch({ type: START_LOADING })
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery, controller)
        dispatch({ type: SEARCH_ALL, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {

    }
}


export const createPosts = (post) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.createPost(post)
        dispatch({ type: CREATE, payload: data })
        // navigate(`/home/${data._id}`)
    } catch (error) {
        console.log(error)
    }
}

export const updatePosts = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error)
    }
}


export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likesPost(id)
        dispatch({ type: LIKEPOST, payload: data })
    } catch (error) {
        console.log(error)
    }
}





