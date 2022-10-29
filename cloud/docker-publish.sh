#!/usr/bin/env bash

VERSION="latest"
REGISTRY_ID="crp96m81iaqbn2j2o9du"
HOST="84.201.187.16"
USER="vicpril"

docker-compose --project-directory ../. -f ../docker-compose.yaml build --progress auto

docker tag bomberman_sockets "cr.yandex/$REGISTRY_ID/bomberman_sockets:$VERSION"
docker tag bomberman_ssr "cr.yandex/$REGISTRY_ID/bomberman_ssr:$VERSION"
docker tag bomberman_nginx "cr.yandex/$REGISTRY_ID/bomberman_nginx:$VERSION"

docker push "cr.yandex/$REGISTRY_ID/bomberman_sockets:$VERSION"
docker push "cr.yandex/$REGISTRY_ID/bomberman_ssr:$VERSION"
docker push "cr.yandex/$REGISTRY_ID/bomberman_nginx:$VERSION"

ssh $USER@$HOST docker pull "cr.yandex/$REGISTRY_ID/bomberman_sockets:$VERSION"
ssh $USER@$HOST docker pull "cr.yandex/$REGISTRY_ID/bomberman_ssr:$VERSION"
ssh $USER@$HOST docker pull "cr.yandex/$REGISTRY_ID/bomberman_nginx:$VERSION"
