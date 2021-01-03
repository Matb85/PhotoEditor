@ECHO OFF

git add -A

git commit -m %2

git tag -a %1 -m %2