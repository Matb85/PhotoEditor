@ECHO OFF
rem %1 - a version number ; %2 - a comment to %1


rem npm run build:lib

rem git add -A

npm version %1 -m %2

npm publish

git push origin master