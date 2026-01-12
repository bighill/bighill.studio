#!/bin/bash

cd "$(dirname "$0")"
npx live-server \
  --port=8181 \
  --no-browser \
  --host=0.0.0.0 
  