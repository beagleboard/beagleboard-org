#!/bin/sh
docker exec gitlab_web_1 gitlab-backup create
sudo cp /mnt/5tb/gitlab/config/gitlab* /home/ubuntu/workspace/beagleboard-docs/docker/gitlab/
sudo chown ubuntu:ubuntu /home/ubuntu/workspace/beagleboard-docs/docker/gitlab/*
cd /home/ubuntu/workspace/beagleboard-docs/docker/gitlab/
git commit . -m "latest gitlab config"
git push
