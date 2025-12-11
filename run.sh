#!/bin/bash
echo "start pull the changes"
git fetch
git pull
echo "pulled changes"
echo "rm the dist"
rm -rf dist
echo "removed"
npm run build
sudo serve -s dist -l 80