import Container from 'react-bootstrap/esm/Container';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import Home from './Home';
import About from './About';

function Body() {
    return (
        <Container>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/About' element={<About />} />
                </Routes>
            </Router>
        </Container>
    );
}

export default Body;