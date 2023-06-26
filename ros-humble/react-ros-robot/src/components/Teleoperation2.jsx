import { Joystick } from 'react-joystick-component';
import React, { Component, useState } from "react";
import Config from '../scripts/Config';


class Teleoperation extends Component {

    state = { ros: null};
    constructor () {

    }
    const [connected, isConnected] = useState(false);
    const ros = new window.ROSLIB.Ros({ encoding: 'ascii' });

    function initConnection() {
        ros.connect("ws://" + Config.ROSBRIDGE_SERVER_IP + ":" + Config.ROSBRIDGE_SERVER_PORT);
    }

    function connect() {
        try {
            initConnection();
        } catch (error) {
            console.log('error initiating connection');
        }
        // won't let the user connect more than once
        ros.on('error', function (error) {
            console.log(error);
            isConnected(false);
        });

        ros.on('connection', function () {
            console.log('Connected!');
            isConnected(true);
        });

        ros.on('close', function () {
            console.log('Connection closed');
            isConnected(false);
            setTimeout(() => {
                try {
                    initConnection();
                } catch (error) {
                    console.log('error initiating connection');
                }
            }, 1000);
        });
    }

    function test() {

        //create publisher on cmd_vel
        const rosout = new window.ROSLIB.Topic({
          ros: ros,
          name: "/rosout",
          messageType: "rcl_interfaces/msg/Log"
        });

        //create twist msg
        const data = new window.ROSLIB.Message({
            msg: 'test'
        });

        //publish msg on /cmd_vel
        rosout.publish(data);
        console.log('publishing');
    }

    function handleMove() {
        console.log('handle move');

        //create publisher on cmd_vel
        const cmd_vel = new window.ROSLIB.Topic({
          ros: ros,
          name: "Config.CMD_VEL_TOPIC",
          messageType: "Config.CMD_VEL_MSG_TYPE"
        });

        //create twist msg
        const twist = new window.ROSLIB.Message({
            linear: {
                x : 2,
                y : 0,
                z : 0,
            },
            angular: {
                x : 0,
                y : 0,
                z : 0,
            }

        });

        //publish msg on /cmd_vel
        cmd_vel.publish(twist);
        console.log('publishing');
    }

    function handleStop() {
        console.log('handle stop');
    };

    return (
        <div>
            <h1>Joystick Teleop</h1>
            <Joystick
                size={150}
                sticky={false}
                baseColor="#EEEEEE"
                stickColor="#BBBBBB"
                move={test}
                stop={handleStop}>
        </Joystick>
        </div>
    );
}

export default Teleoperation;
