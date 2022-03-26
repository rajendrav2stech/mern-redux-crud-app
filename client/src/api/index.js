import axios from "axios"


const API = axios.create({ baseURL: 'http://localhost:8001' })

API.interceptors.request.use((req) => {
    if (sessionStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(sessionStorage.getItem('profile')).token}`
    }
    return req
})


// SIGN IN / SIGN UP
export const signIn = (formData) => API.post('/user/sign-in', formData)
export const signUp = (formData) => API.post('/user/sign-up', formData)

// ALL POST
export const fetchPost = (id) => API.get(`/posts/get-post/${id}`)
export const fetchPosts = (page) => API.get(`/posts/get-post?page=${page}`)
export const fetchPostsBySearch = (searchQuery, controller) => API.get(`/posts/search?searchQuery=${searchQuery.search}`, { signal: controller.signal })
// export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tag=${searchQuery.tags}`)
export const createPost = (newPost) => API.post('/posts/create-post', newPost)
export const updatePost = (id, updatedPost) => API.put(`/posts/update-post/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`/posts/delete-post/${id}`)
export const likesPost = (id) => API.patch(`/posts/like-post/${id}`)