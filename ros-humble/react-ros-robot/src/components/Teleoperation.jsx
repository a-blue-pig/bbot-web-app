import React, { Component } from "react";
import { Joystick } from "react-joystick-component";
import Config from "../scripts/Config";
import ROSLIB from 'roslib';

// Using a class instead so that we can bind ros to the
// publisher function.
class Teleoperation extends Component {
  state = { ros: null };

  constructor() {
    super();
    this.init_connection();

    // create the binds to use the functions
    this.handleMove = this.handleMove.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  // connect to the websocket (from tutorial)
  init_connection() {
    this.state.ros = new ROSLIB.Ros();
    console.log(this.state.ros);

    this.state.ros.on("connection", () => {
      console.log("connection established in Teleoperation Component!");
      console.log(this.state.ros);
      this.setState({ connected: true });
    });

    this.state.ros.on("error", (error) => {
      console.log("Error on connection!");
      console.log(this.state.ros);
      this.setState({ connected: false});
    });

    this.state.ros.on("close", () => {
      console.log("connection is closed!");
      this.setState({ connected: false });
      //try to reconnect every 3 seconds
      setTimeout(() => {
        try {
          this.state.ros.connect(
            "ws://" +
              Config.ROSBRIDGE_SERVER_IP +
              ":" +
              Config.ROSBRIDGE_SERVER_PORT +
              ""
          );
        } catch (error) {
          console.log("connection problem ");
        }
      }, Config.RECONNECTION_TIMER);
    });

    try {
      this.state.ros.connect(
        "ws://" +
          Config.ROSBRIDGE_SERVER_IP +
          ":" +
          Config.ROSBRIDGE_SERVER_PORT +
          ""
      );
    } catch (error) {
      console.log(
        "ws://" +
          Config.ROSBRIDGE_SERVER_IP +
          ":" +
          Config.ROSBRIDGE_SERVER_PORT +
          ""
      );
      console.log("connection problem ");
    }
  }



  // Function for when the joystick is moved
  handleMove(event) {
    // create a ROS publisher on the topic cmd_vel
    var cmd_vel = new ROSLIB.Topic({
      ros: this.state.ros,
      name: Config.CMD_VEL_TOPIC,
      messageType: Config.CMD_VEL_MSG_TYPE,
    });

    // create a twist message to be to published to rosbridge
    var twist = new ROSLIB.Message({
      linear: {
        x: event.y*2,
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: -event.x,
      },
    });

    //we need to publish the message on the cmd_vel topic
    cmd_vel.publish(twist);
  }



  // Function for when we let go of the joystick
  handleStop(event) {
    // create a ROS publisher on the topic cmd_vel
    var cmd_vel = new ROSLIB.Topic({
      ros: this.state.ros,
      name: Config.CMD_VEL_TOPIC,
      messageType: Config.CMD_VEL_MSG_TYPE,
    });

    // create a twist message to be to published to rosbridge
    var twist = new ROSLIB.Message({
      linear: {
        x: 0,
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: 0,
      },
    });

    //we need to publish the message on the cmd_vel topic
    cmd_vel.publish(twist);
  }


  render() {
    return (
      <div>
        <Joystick
          size={100}
          baseColor="#EEEEEE"
          stickColor="#BBBBBB"
          move={this.handleMove}
          stop={this.handleStop}
        ></Joystick>
      </div>
    );
  }
}

export default Teleoperation;
