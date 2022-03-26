import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import SideMenuBar from '../components/Sidebar/SideMenuBar';

const PageLayout = () => {
    const { isToggle } = useSelector(state => state.sidebarToggle)
    return (
        <>
            <SideMenuBar />
            <Header />
            <div className={!isToggle ? 'main' : 'main active'}>
                <Container fluid>
                    <Row>
                        <Col>
                            <div className='p_3'>
                                <Outlet />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default PageLayout

