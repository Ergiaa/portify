#!/bin/sh
set -e

CONTAINER="portify-garage"
BUCKET="portify"
KEY_NAME="portify-server"

echo "Waiting for Garage to be ready..."
until docker exec "$CONTAINER" /garage status > /dev/null 2>&1; do
  sleep 1
done

echo "Getting node ID..."
NODE_ID=$(docker exec "$CONTAINER" /garage node id 2>/dev/null | cut -d'@' -f1)
echo "  Node: $NODE_ID"

echo "Assigning layout (zone=dc1, capacity=1G)..."
docker exec "$CONTAINER" /garage layout assign -z dc1 -c 1G "$NODE_ID"

echo "Applying layout..."
docker exec "$CONTAINER" /garage layout apply --version 1

echo "Creating bucket: $BUCKET"
docker exec "$CONTAINER" /garage bucket create "$BUCKET" 2>/dev/null && echo "  Bucket created" || echo "  Bucket already exists"

echo "Creating access key: $KEY_NAME"
KEY_OUTPUT=$(docker exec "$CONTAINER" /garage key create "$KEY_NAME" 2>/dev/null)

if [ -z "$KEY_OUTPUT" ]; then
  echo "  Key '$KEY_NAME' already exists — cannot retrieve secret again."
  echo "  To reset: docker exec $CONTAINER /garage key delete $KEY_NAME  then re-run this script."
  exit 1
fi

KEY_ID=$(echo "$KEY_OUTPUT" | grep "Key ID" | awk '{print $NF}')
SECRET=$(echo "$KEY_OUTPUT" | grep "Secret key" | awk '{print $NF}')

echo "Granting key full access to bucket..."
docker exec "$CONTAINER" /garage bucket allow --read --write --owner "$BUCKET" --key "$KEY_NAME"

echo ""
echo "================================================"
echo "  Add these to apps/server/.env:"
echo "================================================"
echo ""
echo "STORAGE_ENDPOINT=http://localhost:3900"
echo "STORAGE_BUCKET=$BUCKET"
echo "STORAGE_ACCESS_KEY_ID=$KEY_ID"
echo "STORAGE_SECRET_ACCESS_KEY=$SECRET"
echo "STORAGE_PUBLIC_URL=http://localhost:3000"
echo ""
