import { Row, Col, Container, Button } from 'react-bootstrap';

import RobotStats from './RobotStats';
import Connection from './Connection';
import Teleoperation from './Teleoperation';
import Map from './Map';

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
                <Row>
                    <Col>
                        <RobotStats />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;
