#!/bin/bash
# https://hub.docker.com/r/owncloud/server
#docker run -d --rm --name owncloud -p 8081:8080 --env-file=$HOME/workspace/beagleboard-docs/docker/owncloud/owncloud.env owncloud/server:10.9.1
docker-compose -f $HOME/workspace/beagleboard-docs/docker/owncloud/docker-compose.yml --env-file=$HOME/workspace/beagleboard-docs/docker/owncloud/owncloud.env up -d
