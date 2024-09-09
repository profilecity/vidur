#!/bin/bash

source .env

VERSION=$(npm pkg get version | tr -d \")

if [ -z "$VERSION" ]; then
  echo "Version not found in package.json"
  return
fi

docker build . -t profilecity/vidur:$VERSION -f infra/Dockerfile.prod

# Publish to Docker registry
docker tag profilecity/vidur:$VERSION profilecity/vidur:latest
docker push profilecity/vidur:$VERSION
docker push profilecity/vidur:latest

if [ -z "$ECR_HOST" ]; then
  echo "ECR host not found "
  return
fi
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ECR_HOST

# Publish to ECR
docker tag profilecity/vidur:$VERSION $ECR_HOST/profilecity/vidur:$VERSION
docker tag profilecity/vidur:latest $ECR_HOST/profilecity/vidur:latest
docker push $ECR_HOST/profilecity/vidur:$VERSION
docker push $ECR_HOST/profilecity/vidur:latest
