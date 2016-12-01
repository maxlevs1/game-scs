@echo off
cls
cls
pushd "%~dp0"
if "%~1" == "" (
	echo "Get the saving path!"
	goto :end
)
echo.

echo Searching directory with saves!
cd %~1>nul
if /i %errorlevel% geq 1 (
	echo Get the saving path!
	goto :end
) else (
	echo OK!
	cd ..
)
echo.

echo Searching .git directory!
cd .git>nul
if /i %errorlevel% geq 1 (
	echo Initing git!
	git init
	git config --global user.email "kuplinov.partnership@mail.ru"
	git config --global user.name "Kuplinov"
) else (
	echo OK!
	cd ..
)
echo.

Set TEMPORARY="%~1\some_save_file.lak"
echo Some saves data!! > %TEMPORARY%
echo {"path" : "%~1","sver" : 0} > config.json
echo. > .gitignore
git add .gitignore config.json %~1
git commit -m "Getting started!"
echo /* > .gitignore
echo !/.gitignore >> .gitignore
echo !/config.json >> .gitignore
echo !/%~1/ >> .gitignore
echo !/%~1/* >> .gitignore
del %TEMPORARY%
git add -A
git commit -m "Activate ignotring needless files"

echo "WAIT!!! WAAAIT for Installing dependency libraries!!! And Enjoy LATER!"
echo "Game-SCS has been initialized!"
echo "Use \"cd <saves_directory> & gulp\" in command line for start it!"
echo "Also you can add this command in game link!"
echo "WAIT!!! WAAAIT for Installing dependency libraries!!! And Enjoy LATER!"

echo Installing dependency libraries!
npm i
echo Ok!

:end