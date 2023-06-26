const Config = {
    ROSBRIDGE_SERVER_IP: "10.149.11.97",
    ROSBRIDGE_SERVER_PORT: "9090",
    CMD_VEL_TOPIC: "/turtle1/cmd_vel",
    CMD_VEL_MSG_TYPE: "geometry_msgs/msg/Twist",
    RECONNECTION_TIMER: "1000",
    VEL_STATS_TOPIC: "/turtle1/pose",
    VEL_STATS_MSG_TYPE: "turtlesim/msg/Pose"
};

export default Config;
