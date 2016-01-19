#!/bin/bash
# Invoke as beagleboard.org/install.sh (from one directory up).
# It is assumed you have already run the following command to fetch code:
# git clone http://www.beagleboard.org/beagleboard.org.git/ beagleboard.org
# 
# sudo apt-get update
# sudo apt-get install -y default-jre
# sudo apt-get install -y nginx
[ -d beagleboard.org ] || (echo "Run one directory above beagleboard.org" && exit -1)
[ -e helma-1.6.1.tar.gz ] || wget http://adele.helma.org/download/helma/1.6.1/helma-1.6.1.tar.gz
[ -e helma-1.6.1 ] || tar xvzf helma-1.6.1.tar.gz
cd helma-1.6.1
cd apps
[ -e beagle ] || ln -s ../../beagleboard.org beagle
cd ..
[ -f apps.properties ] && mv apps.properties apps.properties.original
[ -L apps.properties ] || ln -s apps/beagle/config/apps.properties
cd lib
mv ext ext.original
[ -e rhino.jar ] && mv rhino.jar rhino.jar.original
[ -L ext ] || ln -s ../apps/beagle/lib ext
cd ..
[ -d db ] || mkdir db
cd db
[ -L beagle ] || ln -s ../apps/beagle/db beagle
cd ..
cd scripts
[ -L beagle ] || ln -s ../apps/beagle/scripts beagle
cd ..
cd ..

