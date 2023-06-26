import { useState } from "react";
import Alert from "react-bootstrap/Alert"
import Config from "../scripts/Config"
import ROSLIB from 'roslib'

function Connection() {
    const [connected, isConnected] = useState(false);
    const ros = new ROSLIB.Ros({ encoding: 'ascii' })

    // Connect to the Websocket
    function initConnection() {
        ros.connect("ws://" + Config.ROSBRIDGE_SERVER_IP + ":" + Config.ROSBRIDGE_SERVER_PORT);
    }
    function connect() {
        try {
            initConnection();
        } catch (error) {
            console.log('error - ConnectStatus');
        }
        // won't let the user connect more than once
        ros.on('error', function (error) {
            console.log(error);
            isConnected(false);
        });

        ros.on('connection', function () {
            console.log('Connected - ConnectStatus');
            isConnected(true);
        });

        ros.on('close', function () {
            console.log('Connection closed- ConnectStatus');
            isConnected(false);
            setTimeout(() => {
                try {
                    initConnection();
                } catch (error) {
                    console.log('error - ConnectStatus');
                }
            }, Config.RECONNECTION_TIMER);
        });
    }

    // automatically connect when the window loads
    window.onload = connect();

    // UI item that shows connection status
    return (
        <div>
            <Alert className="text-center m-3" variant={connected ? 'success' : 'danger'}> {connected ? 'Robot Connected' : 'Robot Disconnected'}</Alert>
        </div>
    );
}

export default Connection;
