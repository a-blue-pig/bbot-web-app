import { useState } from "react";
import Alert from "react-bootstrap/Alert"
import Config from "../scripts/Config"

function Connection() {
    const [connected, isConnected] = useState(false);
    const ros = new window.ROSLIB.Ros({ encoding: 'ascii' })

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

    window.onload = connect();

    return (
        <div>
            <Alert className="text-center m-3" variant={connected ? 'success' : 'danger'}> {connected ? 'Robot Connected' : 'Robot Disconnected'}</Alert>
        </div>
    );
}

export default Connection;
