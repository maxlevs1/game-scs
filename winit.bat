@echo off
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
) else (
	echo OK!
	cd ..
)
echo.

echo Installing dependency libraries!
	npm install 1>nul 2>nul
echo Ok!

Set TEMPORARY="%~1\some_save_file.lak"
echo Some saves data!! > %TEMPORARY%

:end