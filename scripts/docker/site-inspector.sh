#!/bin/bash
cd /mnt/workspace/siteinspector
docker build -t site-inspector .
docker-compose up -d
