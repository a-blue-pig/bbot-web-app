import Connection from './Connection';
import Teleoperation from './Teleoperation2';
import Map from './Map';
import { Row, Col, Container, Button } from 'react-bootstrap';

function Home() {
    return (
        <div>
            <Container>
                <h1 className="text-center mt-3">Robot Control Page</h1>
                <p className="text-center">Test App for Bumpybot Ros Navigation Interface</p>

                <Row> 
                    <Col>
                        <Connection />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Teleoperation />
                    </Col>
                    <Col>
                        <Map />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;
