import React from 'react'
//react-bootstrap
import { Col, Row } from 'react-bootstrap'
//components
import Product from '../components/Product'
//products
import products from '../products'

const HomeScreen = () => {
    const mapProducts = () => {
        return (
            <>
            {products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>
            ))}
            </>
        )
    }

    return (
        <>
            <h1>Latest Products</h1>  
            <Row>
                {mapProducts()}
            </Row> 
        </>
    )
}

export default HomeScreen
