import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getPost, getPostsBySearch } from '../../actions/posts'
import { BiLike } from 'react-icons/bi'
import Spinner from '../Spinner/Spinner'


const PostDetails = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const { post, posts, isLoading } = useSelector((state) => state.posts)

    useEffect(() => {
        dispatch(getPost(id))
    }, [id])

   

    console.log("post", post)
    if (!post) return null
    if (isLoading) {
        return <Spinner />
    }
    return (
        <ul>
            <li> <Link to={`/home`}>Go Back</Link></li>
            <li>
                <div className='pad'>
                    <div className='box_shd'>

                        {post.seletedFile ? <img src={post.seletedFile.base64} alt="" /> : <div className="box_back"><span><img src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png" alt="" /></span></div>}
                        <div className="content">
                            <h4>{post.name}</h4>
                            <h4>{post.title}</h4>
                            <h5>{moment(post.createdAt).fromNow()}</h5>
                            <div className='edit'>


                            </div>
                            <div className='tag'>
                                <p>{post.tag.map((tag) => `# ${tag}`)}</p>
                            </div>
                            <div className='message'>
                                <p> {post.message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default PostDetails