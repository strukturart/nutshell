#!/bin/sh 
rm -rf ./dist
mkdir ./dist
mkdir ./dist/assets
cp ./application/manifest.webapp ./dist/
cp -r ./application/assets/ ./dist/
cp ./application/oauth.html ./dist/
cp ./application/oauth.js ./dist/

parcel  --no-source-maps  --no-cache  ./application/index.html