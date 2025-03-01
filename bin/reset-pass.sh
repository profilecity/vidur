#!/bin/bash

# ONLY AVAILABLE IN DEV MODE
# This command will fail if server is not running in dev mode.
if [[ ! -d .nitro ]]; then
  ln -s .nuxt .nitro
fi

if [ ! $# -eq 2 ]
then
  echo "No arguments supplied"
  echo "Usage: bin/reset-pass.sh <email> <password>"
else
  echo "Resetting password for $1"
  npx nitro task run chore:reset-pass --payload "{ \"email\": \"$1\", \"password\": \"$2\" }"
fi