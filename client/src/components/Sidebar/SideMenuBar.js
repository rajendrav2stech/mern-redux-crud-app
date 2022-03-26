import React, { useEffect, useState } from 'react'
import { BiHomeAlt, BiUser } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { DARK_LOGO, LOGO, MAIN_LOGO } from '../../assets/images'

const SideMenuBar = () => {
    const { posts } = useSelector((state) => state.posts)
    const { isToggle } = useSelector(state => state.sidebarToggle)

    const location = useLocation()

    const [profile, setProfile] = useState('')

    useEffect(() => {
        setProfile(JSON.parse(sessionStorage.getItem('profile')))
    }, [setProfile])

    
    // console.log(profile.result.email)

    let menuList = [
        {
            id: 'home',
            value: 'Home',
            icon: <BiHomeAlt />,
            url: '/home'
        },
        {
            id: 'portfolio',
            value: 'Portfolio',
            icon: <BiUser />,
            url: '/portfolio'
        },
    ]

    const menuChangeHandel = (id) => {
        localStorage.setItem('url', id)
    }

    return (
        <div className={!isToggle ? 'sidebar' : 'sidebar active'}>
            <div className='rel'>
                <div className='side_logo'>
                    {!isToggle ? <img src={MAIN_LOGO} alt="logo" /> : <img src={LOGO} alt="loog" />}
                </div>
                <div className='sidebar-menu'>
                    <ul>
                        {
                            menuList.map((items) => {
                                return (
                                    <li
                                        key={items.id}
                                        className={location.pathname === items.url ? "active" : "unactive"}
                                        onClick={() => menuChangeHandel(items.id)}>
                                        <Link to={items.url}>
                                            {items.icon}
                                            <span>
                                                {items.value}
                                                {items.url == '/home' && <span className='cheet_cart'>{posts.length}</span>}
                                            </span>

                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default SideMenuBar