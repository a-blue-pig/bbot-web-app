import { Row, Col, Container, Button } from 'react-bootstrap';
import { useState } from "react";
import ROSLIB from 'roslib';
import Config from '../scripts/Config';

function RobotStats() {
    const [connected, isConnected] = useState(false);
    const [linear_vel, update_lin_vel] = useState({vel: 0});
    const [angular_vel, update_ang_vel] = useState({omega: 0});

    const ros = new ROSLIB.Ros({ encoding: 'ascii' })

    // Connect to the Websocket
    function initConnection() {
        ros.connect("ws://" + Config.ROSBRIDGE_SERVER_IP + ":" + Config.ROSBRIDGE_SERVER_PORT);
    }
    function connect() {
        try {
            initConnection();
        } catch (error) {
            console.log('error robotstats');
        }
        // won't let the user connect more than once
        ros.on('error', function (error) {
            console.log(error);
            isConnected(false);
        });

        ros.on('connection', function () {
            console.log('Connected - RobotStats');
            isConnected(true);
        });

        ros.on('close', function () {
            console.log('Connection closed - RobotStats');
            isConnected(false);
            setTimeout(() => {
                try {
                    initConnection();
                } catch (error) {
                    console.log('error - RobotStats');
                }
            }, Config.RECONNECTION_TIMER);
        });
    }

    // Create a subscriber
    var vel_subscriber = new ROSLIB.Topic({
        ros: ros,
        name: Config.VEL_STATS_TOPIC,
        messageType: Config.VEL_STATS_MSG_TYPE,
    });

    // Subscriber function
    vel_subscriber.subscribe( (message) => {
        update_lin_vel({vel: message.linear_velocity});
        vel_subscriber.unsubscribe();
    });
    
    window.onload = connect();
    

    return(
        <div>
            <Row>
                <Col>
                    <h4 className="mt-4" >Velocity</h4>
                    <p className="mt-0" >linear: {linear_vel.vel} </p>
                    <p className="mt-0" >angular: {angular_vel.omega}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4 className="mt-4" >Other Stats</h4>
                    <p className="mt-0" >Stat A: </p>
                    <p className="mt-0" >Stat B: </p>
                </Col>
            </Row>
        </div>
    );
}

export default RobotStats;
