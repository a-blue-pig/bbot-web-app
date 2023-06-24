# Quickstart Guide - Under Dev

---
## Install
Install ROS2 Humble -> [Ubuntu Install](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html)
```
# RosBridge
sudo apt install ros-humble-rosbridge-server    #ROSBridgeServer

# NodeJS + NPM
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - &&\
sudo apt-get install -y nodejs

# Clone Repo
git clone git@github.com:a-blue-pig/tbot-web.git -b roslibjs       # ssh or
git clone https://github.com/a-blue-pig/tbot-web.git -b roslibjs   # http

# Install Dependencies
cd tbot-web/ros-humble/react-ros-robot &&\
npm install
```

---
## Run
```
# Start Node Server
cd tbot-web/ros-humble/react-ros-robot &&\
npm start

# Start Ros Bridge on Port 9090
source /opt/ros/humble/setup.bash
ros2 launch rosbridge_server rosbridge_websocket_launch.xml
```
