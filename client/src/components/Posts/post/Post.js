import React from 'react'
import moment from 'moment'
import { BiEditAlt, BiLike, BiTrashAlt } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts'
import { useNavigate } from 'react-router-dom'

export const Post = ({ post, setCurentId }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = JSON.parse(sessionStorage.getItem('profile'))

    const Likes = () => {
        if (post.likeCount.length > 0) {
            return post.likeCount.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <>{post.likeCount.length > 2 ? `You and ${post.likeCount.length - 1} others` : `${post.likeCount.length} like${post.likeCount.length > 1 ? 's' : ''}`}</>
                ) : (
                    <>{post.likeCount.length} {post.likeCount.length === 1 ? 'Like' : 'Likes'}</>
                )
        }
        return <>Like</>;
    }

    const editHandel = () => {
        setCurentId(post._id)
    }
    const deletePosts = () => {
        dispatch(deletePost(post._id))
    }
    const likePosts = () => {
        dispatch(likePost(post._id))
    }
    const openDetailsPost = () => {
        navigate(`/home/${post._id}`)
    }

    return (
        <li>
            <div className='pad'>
                <div className='box_shd'>

                    {post.seletedFile ? <img src={post.seletedFile.base64} alt="" /> : <div className="box_back"><span><img src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png" alt="" /></span></div>}
                    <div className="content">
                        <h4>{post.name}</h4>
                        <h4>{post.title}</h4>
                        <h5>{moment(post.createdAt).fromNow()}</h5>
                        <div className='edit'>
                            {
                                (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && <BiEditAlt onClick={editHandel} />
                            }
                        </div>
                        <div className='tag'>
                            <p>{post.tag.map((tag) => `# ${tag}`)}</p>
                        </div>
                        <div className='message'>
                            <p> {post.message}</p>
                        </div>
                        <div className='button_action d-flex align-item-center justify-content-between'>
                            <span><BiLike onClick={likePosts} />  <span className='count'><Likes /></span></span>
                            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && <BiTrashAlt onClick={deletePosts} />}
                        </div>
                        <div onClick={openDetailsPost}>Read More</div>
                    </div>
                </div>
            </div>
        </li>
    )
}
