import React from 'react'
import {
    BrowserRouter,
    Navigate,
    Routes,
    Route
} from "react-router-dom"
import NotFound from '../components/Pages/NotFound/NotFound'
import Home from '../components/Pages/Home/Home'
import Portfolio from '../components/Pages/Portfolio/Portfolio'
import PostDetails from '../components/PostDetails/PostDetails'
import SignIn from '../components/SignIn/SignIn'
import SIgnUp from '../components/SignUp/SIgnUp'
import PageLayout from './PageLayout'
import PrivateRoute from './PrivateRoute'

const AppRouter = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<SignIn />} />
                <Route path="/sign-up" element={<SIgnUp />} />
                <Route element={<PrivateRoute />}>
                    <Route element={<PageLayout />} >
                        <Route path="/home" element={<Home />} />
                        <Route path="/home/search" element={<Home />} />
                        <Route path="/home/:id" element={<PostDetails />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;
