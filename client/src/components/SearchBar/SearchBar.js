import React from 'react'
import { useNavigate } from 'react-router-dom'



const SearchBar = ({ search, setSearch, dispatch, getPostsBySearch, getPosts }) => {
    const navigate = useNavigate()
    const searchPost = (e) => {
        setSearch(e.target.value)
        if (search.trim() || search.length) {
            dispatch(getPostsBySearch({ search }))
            navigate(`/home/search?searchQuery=${search}`)
        } else {
            dispatch(getPosts())
        }
    }

    const onChangeSearch = (e) => {
        setSearch(e.target.value)
        if (search.trim() || search.length) {
            dispatch(getPostsBySearch({ search }))
            navigate(`/home/search?searchQuery=${search}`)
        } else {
            dispatch(getPosts())
        }
    }



    // const handelKeyPress = (e) => {
    //     if (e.keyCode === 13) {
    //         // Search Post
    //         searchPost()
    //     }
    // }

    return (
        <div className='d-flex'>
            <input className='form-control w-25' type="text" name='Search' placeholder='Search by title' value={search} onChange={onChangeSearch} />
            <button className='btn btn-primary' onClick={searchPost}>Search</button>
        </div>
    )
}

export default SearchBar