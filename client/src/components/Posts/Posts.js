import React, { useEffect } from 'react'
import { Post } from './post/Post'
import { useSelector } from 'react-redux'
import Spinner from '../Spinner/Spinner'

const Posts = ({ setCurentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts)
    if (!posts.length && !isLoading) return "No Post"
    return (
        <div>
            <ul className='create_post'>
                {
                    isLoading ? <Spinner /> : posts.map((post) => {
                        return <Post key={post._id} post={post} setCurentId={setCurentId} />
                    })
                }
            </ul>
        </div>
    )
}

export default Posts