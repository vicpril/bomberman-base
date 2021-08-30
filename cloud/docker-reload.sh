#!/usr/bin/env bash

USER="vicpril"
HOST="84.201.187.16"

ssh $USER@$HOST "cd /var/local/ && docker-compose down"
ssh $USER@$HOST "cd /var/local/ && docker-compose up -d --build --force-recreate"
