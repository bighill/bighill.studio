#!/bin/bash

curl -X POST http://localhost:8787 \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","message":"Test message"}'
