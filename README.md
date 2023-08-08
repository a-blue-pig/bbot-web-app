# TBot Web Navigation App

### Tools Used:
* React (JS)
* Bootstrap
* RobotWebTools (Open Source)
    * Nav2DJS
    * RosLibJs

---
## Dependencies
### ROS 2

#### ROS
Install Ros2 Humble from offical [documentation](https://docs.ros.org/en/humble/index.html).
##
#### ROS2-WEB-BRIDGE
Install with:
```
sudo apt install ros-humble-rosbridge-server
```
##
#### NODE JS >=18.16.1 (includes npm 9.5.1)
Install the latest LTS version
1. Install from their [website]([https://github.com/nodesource/distributions](https://nodejs.org/en/download).
2. Install using package manager. [Instructions here](https://github.com/nodesource/distributions). \

Check NodeJS and NPM versions with

`node -v`  &  `npm -v`


---
## Install
```
git clone git@github.com:a-blue-pig/tbot-web.git       # ssh or
git clone https://github.com/a-blue-pig/tbot-web.git   # http
cd tbot-web/ros-humble/react-ros-robot
npm install
```
Ignore the vulnerability warnings. This is a new feature from npm.


---
## Run Application
Start Node Server
```
cd tbot-web/ros-humble/react-ros-robot &&\
npm start
```
Start Ros Bridge on Port 9090
```
source /opt/ros/humble/setup.bash       # Source Ros2
ros2 launch rosbridge_server rosbridge_websocket_launch.xml
```


---
## Configuration/Breakdown
Important Files and Directories
```
.
├── package.json                 # Installs all dependencies from npm
├── package-lock.json
├── public/
│   ├── index.html
│   └── ros-js/                  # Contains files necessary for ros-js interaction
├── README.md
└── src/
    ├── App.js
    ├── bootstrap/               # Contains styling themes
    ├── components/              # Contains all the components, functions, pages
    ├── index.css
    ├── index.js
    ├── reportWebVitals.js
    ├── scripts/                 # Contains Config.js
    └── setupTests.js
```
