#!/bin/sh
docker-compose -f docker-compose-deploy.yml pull && docker-compose -f docker-compose-deploy.yml up -d
