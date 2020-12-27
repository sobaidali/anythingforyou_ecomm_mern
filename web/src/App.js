import React from 'react'
//css
import './bootstrap.min.css'
//react-router
import { BrowserRouter as Router, Route } from 'react-router-dom'
//react-bootstrap 
import { Container } from 'react-bootstrap';
//components
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductSceen';

function App() {
  return (
    <Router>
      <>
        <Header/>
        <main className="py-3">
          <Container>
           <Route path="/" component={HomeScreen} exact/>
           <Route path="/product/:id" component={ProductScreen} />
          </Container>
        </main>
        <Footer/>
      </>
    </Router>
  );
}

export default App;
