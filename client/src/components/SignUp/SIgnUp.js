import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { signup } from '../../actions/auth'
import GoogleLogin from 'react-google-login'
import { AUTH, AUTHERR } from '../../constants/actionType'
import Spinner from '../Spinner/Spinner'

const SIgnUp = () => {
    const dispatch = useDispatch()
    const { error, isLoading } = useSelector((state) => state.auth)
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [err, setErr] = useState('')
    const navigate = useNavigate()

    const onChangeHandeler = (event) => {
        event.preventDefault()
        const target = event.target
        const name = target.name
        const value = target.value
        setUser({
            ...user, [name]: value
        })
    }
    const onSubmitHandler = async (event) => {
        event.preventDefault()
        const { firstName, lastName, email, password, confirmPassword } = user
        try {
            if (firstName && lastName && email && (password === confirmPassword)) {
                dispatch(signup(user, navigate))
                navigate('/home')
            } else {
                setErr("Something wnts Wrongs")
            }
        } catch (error) {
            console.log(error)
        }
    }
    const googleSuccess = async (response) => {
        const result = response?.profileObj
        const token = response?.tokenId
        try {
            dispatch({ type: AUTH, data: { result, token } })
            navigate('/home')
        } catch (error) {
            console.log(error)
        }

    }
    const googleFailure = (error) => {
        console.log(error)
    }

    return (
        <div className='fullscreen_auth'>
            <Container fluid>
                <Row>
                    <Col md={6} className="sign_in_from">
                        <div className='form_wrapper auth-inner'>
                            <form className='form_wrapper auth-inner' onSubmit={onSubmitHandler}>
                                <div>
                                    <h4>Sign Up</h4>
                                    <h5>See Your growth and get consulting support!</h5>
                                </div>
                                <div className='sign_in_google'>
                                    <GoogleLogin
                                        clientId="97618042992-1rtv0mp2imnmh0a8lsjio2c31fpf9imj.apps.googleusercontent.com"
                                        onSuccess={googleSuccess}
                                        onFailure={googleFailure}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                </div>
                                <div className='sign_in_email'>
                                    <h6>or Sign in with Email</h6>
                                </div>
                                {error && <div className='alert alert-danger'>{error} </div>}
                                {err && <div className='alert alert-danger'>{err} </div>}
                                <div className='form-group'>
                                    <label htmlFor="">First Name <sup>*</sup></label>
                                    <label htmlFor="">
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            name="firstName"
                                            value={user.firstName}
                                            onChange={onChangeHandeler}
                                            required
                                        />
                                    </label>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="">Last Name <sup>*</sup></label>
                                    <label htmlFor="">
                                        <input
                                            placeholder="Last Name"
                                            type="text"
                                            name="lastName"
                                            value={user.lastName}
                                            onChange={onChangeHandeler}
                                            required
                                        />
                                    </label>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="">Email Address <sup>*</sup></label>
                                    <label htmlFor="">
                                        <input
                                            placeholder="email@example.com"
                                            type="email"
                                            name="email"
                                            value={user.email}
                                            onChange={onChangeHandeler}
                                            required
                                        />
                                    </label>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="">Password <sup>*</sup></label>
                                    <label htmlFor="">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            value={user.password}
                                            onChange={onChangeHandeler}
                                            required
                                        />
                                    </label>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="">Confirm Password <sup>*</sup></label>
                                    <label htmlFor="">
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            name="confirmPassword"
                                            value={user.confirmPassword}
                                            onChange={onChangeHandeler}
                                            required
                                        />
                                    </label>
                                </div>
                                <div className='remember_me'>
                                    <div className="left">
                                        <input type="checkbox" className="form-check-input" id="remember" />
                                        <label className="form-check-label" htmlFor="remember">I agree to the <a href="#">Terms & Conditions</a></label>
                                    </div>
                                </div>
                                <div className='button_style'>
                                    <Button variant="primary" type="submit">
                                        {isLoading && <Spinner />} Sign Up
                                    </Button>
                                </div>
                            </form>
                            <div className='accout'>
                                Already have an account <Link to="/">Sign in</Link>
                            </div>
                        </div>
                    </Col>
                    <Col md={6} className="auth_banner">

                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SIgnUp;
