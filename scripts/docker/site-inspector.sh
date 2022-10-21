#!/bin/bash
cd /workspace/siteinspector
docker build -t site-inspector .
docker-compose up -d
