#!/bin/sh
cd /home/ubuntu/beagleboard.org
#curl 'https://beagleboard.org/blog/wp-admin/export.php?content=all&download=true' > beagleboardorg.wordpress.xml
git add beagleboardorg.wordpress.xml
git commit --message="Blog updates" --author="Anonymous <anonymous@beagleboard.org>" beagleboardorg.wordpress.xml
git add wp-uploads
git commit --message="Blog images" --author="Anonymous <anonymous@beagleboard.org>" wp-uploads
killall java
killall -9 java
git pull
git add db
git commit --message="Web updates" --author="Anonymous <anonymous@beagleboard.org>" db
git push
cd /home/ubuntu && ./helma-1.6.1/start.sh > helma.log 2>&1 &
