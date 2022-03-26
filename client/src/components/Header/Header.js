import React, { useState, useEffect } from 'react'
import { Col, Container, Dropdown, Row } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { BiArrowBack, BiBell, BiChevronDown, BiEnvelope, BiMenuAltRight, BiMoon, BiSearch, BiSun } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { DARK_MODE, LIGHT_MODE, LOGOUT, TOOGLE_LEFT, TOOGLE_RIGHT } from '../../constants/actionType';
import decode from 'jwt-decode'

const Header = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [sidebarToggle, setSidebarToggle] = useState(false)

    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('profile')))

    const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme')))

    const { isLight } = useSelector((state) => state.theme)

    const logoutHandler = () => {
        dispatch({ type: LOGOUT })
        navigate('/')
        setUser(null)
    }


    useEffect(() => {
        const token = user?.token
        if (token) {
            const decodedToken = decode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) logoutHandler()
        }
        setUser(JSON.parse(sessionStorage.getItem('profile')))
    }, [location])

    const menuToogleBack = () => {
        setSidebarToggle(true)
        dispatch({ type: TOOGLE_LEFT })
    }
    const menuToogleForword = () => {
        setSidebarToggle(false)
        dispatch({ type: TOOGLE_RIGHT })
    }
    const darkModeHandler = () => {
        dispatch({ type: LIGHT_MODE })
        setTheme(false)
        localStorage.setItem('theme', false)
    }
    const lightModeHandler = () => {
        dispatch({ type: DARK_MODE })
        setTheme(true)
        localStorage.setItem('theme', true)
    }

    return (
        <div className={!sidebarToggle ? 'top_header' : 'top_header active'}>
            <Container fluid>
                <Row>
                    <Col>
                        <div className='main_header'>
                            <div className="left">
                                <div className='menu_alt_right'>
                                    {
                                        !sidebarToggle ? <BiMenuAltRight onClick={menuToogleBack} /> : <BiArrowBack className='right' onClick={menuToogleForword} />
                                    }
                                    <form action="" className='serch_bar'>
                                        <input type="text" placeholder='Search...' />
                                        <BiSearch />
                                    </form>
                                </div>
                            </div>
                            <div className='right d-flex activity_parrent'>
                                <div className='language'>
                                    Language
                                </div>
                                <div className="activity">
                                    <div className="message">
                                        <BiEnvelope />
                                    </div>
                                    <div className="notification">
                                        <BiBell />
                                    </div>
                                    <div className="theem_color">
                                        {
                                            !isLight ? <BiSun onClick={lightModeHandler} /> : <BiMoon onClick={darkModeHandler} />
                                        }
                                    </div>
                                </div>
                                <div className='user'>

                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" className='d-flex align-items-center p-0'>
                                            <span>
                                                {
                                                    user?.result.imageUrl
                                                        ? <img src={user?.result.imageUrl} alt="" />
                                                        : <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/768px-Circle-icons-profile.svg.png" alt="" />
                                                }
                                            </span>
                                            <h6>{user?.result.name}</h6>0
                                            <BiChevronDown />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item to="/profile">About</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Change Password</Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>

                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default Header
