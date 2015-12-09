#!/bin/bash
grunt build
rm -Rf .tmp/gh-pages
git clone git@github.com:exteso/accessopolis.git .tmp/gh-pages
cd .tmp/gh-pages && git checkout gh-pages && cd ../..
rm -Rf .tmp/gh-pages/*
cp -Rp dist/* .tmp/gh-pages
cd .tmp/gh-pages
sed -i 's/accessopolis-dev.firebaseio.com/accessopolis.firebaseio.com/g' ./scripts/*.js
sed -i 's/accessopolis-dev.firebaseio.com/accessopolis.firebaseio.com/g' ./scripts2/*.js
git add .
git commit -m "new website version"
git push origin
