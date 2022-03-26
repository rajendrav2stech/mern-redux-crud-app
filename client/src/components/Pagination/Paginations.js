import React, { useEffect } from 'react'
import Pagination from 'react-bootstrap/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPosts } from '../../actions/posts'

const Paginations = ({ page }) => {
    const dispatch = useDispatch()
    const { numberOfPage } = useSelector((state) => state.posts)

    useEffect(() => {
        if (page) {
            dispatch(getPosts(page))
        }
    }, [page])
    let currentPage = Number(page)
    let totalPages = numberOfPage
    const pageNumbaer = []
    for (let i = 1; i <= numberOfPage; i++) {
        pageNumbaer.push(i)
    }
    return (
        <div className='pt-0 p-2 d-flex align-items-center justify-content-between'>
            <div className='d-flex'>
                <h6> Page No {Number(page) || 1}  || </h6>
                <h6>Total Page {numberOfPage} </h6>
            </div>
            <div>
                {page &&
                    <ul className="pagination">
                        <li className={`page-item first-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <Link to={`/home?page=${1}`} className="page-link">First</Link>
                        </li>
                        <li className={`page-item previous-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <Link to={`/home?page=${currentPage - 1}`} className="page-link">Previous</Link>
                        </li>
                        {
                            pageNumbaer.map(items => {
                                return <li key={items} className={`page-item number-item ${currentPage === items ? 'active' : ''}`}>
                                    <Link to={`/home?page=${items}`} className="page-link">{items}</Link>
                                </li>
                            })
                        }
                        <li className={`page-item next-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <Link to={`/home?page=${currentPage + 1}`} className="page-link">Next</Link>
                        </li>
                        <li className={`page-item last-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <Link to={`/home?page=${totalPages}`} className="page-link">Last</Link>
                        </li>
                    </ul>
                }
            </div>
        </div >
    )
}

export default Paginations