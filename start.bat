@echo off

call npm install cmake-js
call npm install node-llama-cpp

node .\package_setting.js
node .\Web_serivce.js