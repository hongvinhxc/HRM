#!/bin/bash

# Read agurment
mode=$1

# Copy file
if [ "$mode" = "prod" ]
then
    cp ./docker/docker-compose.prod.yml docker-compose.yml
    cp ./docker/Dockerfile.prod Dockerfile
    note="This is production eviroment"
else
    cp ./docker/docker-compose.dev.yml docker-compose.yml
    cp ./docker/Dockerfile.dev Dockerfile
    note="This is development eviroment"
fi

# Build docker image
docker build -t base-api:1.0 .

# Compose containers
docker compose up -d

echo "";
echo $note

echo "";
echo "Go http://localhost:5000 to see HRM interface";