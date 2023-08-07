#!/bin/bash
if [[ ($1 = "prod" || $1 = "dev") && ($2 = "down" || $2 = "up") ]]; then
  # cd ..
  fileEnv="docker-compose.${1}.yml"
  downOrUp=$2
  echo "Running docker compose -f $downOrUp -f $fileEnv --build --attach backend --attach frontend --attach bdd"
  docker compose -f $downOrUp --build -f $fileEnv  --attach backend --attach frontend --attach bdd
else
  echo "Need to follow format ./deploy.sh prod|dev up|down"
fi