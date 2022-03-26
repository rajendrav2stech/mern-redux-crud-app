import React, { useEffect, useState } from 'react'
import Form from '../../Form/Form'
import Posts from '../../Posts/Posts'

import { useDispatch } from 'react-redux'
import { getPosts, getPostsBySearch } from '../../../actions/posts'
import Paginations from '../../Pagination/Paginations'
import { useNavigate, useLocation } from 'react-router-dom'
import SearchBar from '../../SearchBar/SearchBar'

const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const [curentId, setCurentId] = useState(null)
    const dispatch = useDispatch()
    const query = useQuery()
    const navigate = useNavigate()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')
    const [search, setSearch] = useState('')

    useEffect(() => {
        dispatch(getPosts())
    }, [curentId, dispatch])

    useEffect(() => {
        if (search.length === 0) {
            navigate(`/home`)
        }
    }, [search])
    return (
        <>
            <SearchBar search={search} setSearch={setSearch} dispatch={dispatch} getPostsBySearch={getPostsBySearch} getPosts={getPosts} />
            <div className='d-flex justify-content-between'>
                <div className='d-block left_set_id'>
                    <Posts setCurentId={setCurentId} />
                    {
                        !searchQuery && <Paginations page={page} />
                    }
                </div>
                <Form curentId={curentId} setCurentId={setCurentId} />

            </div>
        </>
    )
}

export default Home