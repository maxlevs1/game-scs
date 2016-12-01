#!/bin/sh

cd `dirname $0`

#Check path argument
if [ -z $1 ]; then
	echo "Get the saving path!";
	exit;
fi
case `ls | grep $1` in 
	$1) echo "True path!" ;;
	*) echo "Get the saving path!"; exit;; 
esac

# Check git initing
DIRECTORY=".git"
if [ ! -d "$DIRECTORY" ]; then
	echo "GIT Iniging!";
	git init;
fi

echo "Installing dependency libraries!"
npm install
TEMPORARY="$1/some_save_file.lak"
echo "Some saves data!" > $TEMPORARY
echo "{\"path\" : \"saver\",\"sver\" : 0}" > "config.json"
git add .gitignore config.json $1
git commit -m 'Getting started!'
echo "/*\n!/.gitignore\n!/config.json\n!/saver/\n!/saver/*" > ".gitignore"
rm $TEMPORARY
git add -A
git commit -m 'Activate ignotring needless files'

echo "Game-SCS has been initialized!"
echo "Use \"cd <saves_directory> & gulp\" in command line for start it!"
echo "Also you can add this command in game link!"
echo "Enjoy!"