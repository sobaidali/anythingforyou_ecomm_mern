import React from 'react'
//react-bootstrap
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; Anythingforyou
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
