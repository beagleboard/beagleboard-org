#!/bin/sh
cd ~/helma-1.6.1/apps/beagle
git add static/irclog
git commit --message="Log updates" --author="Anonymous <anonymous@beagleboard.org>" static/irclog
git push
