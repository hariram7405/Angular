@echo off
echo Building and deploying Angular projects...

echo.
echo Building Day1 Phase1...
cd "Day1\Phase1"
call npm install
call ng build --base-href="/Angular-Training/day1-phase1/"
cd ..\..

echo.
echo Building Day1 Project2...
cd "Day1\Project2"
call npm install
call ng build --base-href="/Angular-Training/day1-project2/"
cd ..\..

echo.
echo Building Day2 Phase1...
cd "Day2\Phase1"
call npm install
call ng build --base-href="/Angular-Training/day2-phase1/"
cd ..\..

echo.
echo Building Day2 Project2...
cd "Day2\Project2"
call npm install
call ng build --base-href="/Angular-Training/day2-project2/"
cd ..\..

echo.
echo All projects built successfully!
echo Push to GitHub to trigger automatic deployment.
pause