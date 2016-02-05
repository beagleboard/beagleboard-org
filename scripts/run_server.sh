#!/bin/sh
killall java
killall -9 java
cd /home/ubuntu/beagleboard.org
git pull
git add db
git commit --message="Web updates" --author="Anonymous <anonymous@beagleboard.org>" db
git push
cd /home/ubuntu && ./helma-1.6.1/start.sh > helma.log 2>&1 &
