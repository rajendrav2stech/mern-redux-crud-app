import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FileBase64 from 'react-file-base64'
import { createPosts, updatePosts } from '../../actions/posts'
import Paginations from '../Pagination/Paginations'
import { useNavigate } from 'react-router-dom'

const Form = ({ curentId, setCurentId }) => {
    const [user, setUser] = useState({
        // creator: '',
        title: '',
        message: '',
        tag: [],
        seletedFile: '',
    })

    const onChangeHandeler = (event) => {
        event.preventDefault()
        const target = event.target
        const name = target.name
        const value = target.value
        setUser({
            ...user, [name]: value
        })
    }

    const posts = useSelector((state) => curentId ? state.posts.posts.find((p) => p._id === curentId) : null)


    let dispatch = useDispatch()
    const navigate = useNavigate()

    // Who can create the post
    const createUser = JSON.parse(sessionStorage.getItem('profile'))

    useEffect(() => {
        posts && setUser(posts)

        if (!createUser?.result.name) {
            return (
                <h1>Pleasae sign In Create Post</h1>
            )
        }

    }, [posts])

    const onSubmitHandler = (event) => {
        event.preventDefault()
        if (curentId) {
            dispatch(updatePosts(curentId, { ...user, name: createUser?.result.name }))
        } else {
            dispatch(createPosts({ ...user, name: createUser?.result.name }))
        }
        clear()
    }
    const clear = () => {
        setCurentId(null)
        setUser({
            // creator: '',
            title: '',
            message: '',
            tag: [],
            seletedFile: '',
        })
    }


    return (
        <>
            <div className='create_post_form'>
                <div className='box_shd'>
                    <div className='z_index'>
                        <h4>{!curentId ? 'Create' : 'Update'} a  post</h4>
                        <form onSubmit={onSubmitHandler}>
                            {/* <div className='form-group'>
                                <label htmlFor="">
                                    <input
                                        type="text"
                                        placeholder="Creator"
                                        name="creator"
                                        value={user.creator}
                                        onChange={onChangeHandeler}
                                        required
                                    />
                                </label>
                            </div> */}
                            <div className='form-group'>
                                <label htmlFor="">
                                    <input
                                        placeholder="Title"
                                        type="text"
                                        name="title"
                                        value={user.title}
                                        onChange={onChangeHandeler}
                                        required
                                    />
                                </label>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="">
                                    <input
                                        placeholder="Message"
                                        type="text"
                                        name="message"
                                        value={user.message}
                                        onChange={onChangeHandeler}
                                        required
                                    />
                                </label>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="">
                                    <input
                                        type="text"
                                        placeholder="Tags"
                                        name="tag"
                                        value={user.tag}
                                        onChange={onChangeHandeler}
                                        required
                                    />
                                </label>
                            </div>
                            <div className='form-group'>
                                <FileBase64
                                    type="file"
                                    name="seletedFile"
                                    multiple={false}
                                    onDone={(bese64) => user.seletedFile = bese64} />
                            </div>
                            <div>
                                <Button className='w-100 mb-2 mt-2' variant="primary" type="submit">
                                    {!curentId ? 'Create' : 'Update'} a  Post
                                </Button>
                                <Button className='w-100' variant="danger" onClick={clear} type="button">
                                    Clear
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Form
