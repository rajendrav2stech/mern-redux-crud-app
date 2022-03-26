import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signin } from '../../actions/auth';
import { GoogleLogin } from 'react-google-login'
import { AUTH, AUTHERR } from '../../constants/actionType'
import Spinner from '../Spinner/Spinner';
import { SIGN_BANNER } from '../../assets/images';


const SignIn = () => {
    const { error, isLoading } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const onChangeHandeler = (event) => {
        event.preventDefault()
        const target = event.target
        const name = target.name
        const value = target.value
        setUser({
            ...user,
            [name]: value
        })
    }

    const onSumbitHandel = async (event) => {
        event.preventDefault()
        try {
            dispatch(signin(user, navigate))
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
                            <form onSubmit={onSumbitHandel} className='form_wrapper auth-inner' autoComplete="off">
                                <div>
                                    <h4>Login</h4>
                                    <h5>See Your growth and get consulting support!</h5>
                                </div>
                                <div className='sign_in_google'>
                                    <GoogleLogin
                                        clientId="97618042992-1rtv0mp2imnmh0a8lsjio2c31fpf9imj.apps.googleusercontent.com"
                                        onSuccess={googleSuccess}
                                        onFailure={googleFailure}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                    {/* <button ><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png' /> Sign in With Google</button> */}
                                </div>
                                <div className='sign_in_email'>
                                    <h6>or Sign in with Email</h6>
                                </div>
                                {error && <div className='alert alert-danger'>{error} </div>}
                                <div className='form-group'>
                                    <label htmlFor="">Email <sup>*</sup></label>
                                    <label htmlFor="">
                                        <input
                                            type="email"
                                            placeholder="mail@website.com"
                                            name="email"
                                            value={user.email}
                                            onChange={onChangeHandeler}
                                            autoComplete="off"
                                            required
                                        />
                                    </label>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="">Password <sup>*</sup></label>
                                    <label htmlFor="">
                                        <input
                                            type="password"
                                            placeholder="Min. 8 character"
                                            name="password"
                                            value={user.password}
                                            onChange={onChangeHandeler}
                                            autoComplete="off"
                                            required
                                        />
                                    </label>
                                </div>
                                <div className='remember_me'>
                                    <div className="left">
                                        <input type="checkbox" className="form-check-input" id="remember" />
                                        <label className="form-check-label" htmlFor="remember">Remember me</label>
                                    </div>
                                    <div className="right">
                                        <span>Forget password</span>
                                    </div>
                                </div>
                                <div className='button_style'>
                                    <Button variant="primary" type="submit">
                                        {isLoading && <Spinner />}
                                        Login
                                    </Button>
                                </div>
                                <div className='accout'>Not registered yet?  <Link to="/sign-up">Create an Account</Link></div>
                            </form>
                        </div>

                    </Col>
                    <Col md={6} className="auth_banner">
                        <div className='sign_in_banner'>
                            <img src={SIGN_BANNER} alt="banner" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default SignIn
