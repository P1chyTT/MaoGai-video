@echo off
setlocal
cd /d "%~dp0"
set "NODE_OPTIONS="
set "TASK_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if not exist "%TASK_NODE%" set "TASK_NODE=node"
"%TASK_NODE%" scripts\render.mjs video
