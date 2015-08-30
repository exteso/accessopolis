#!/bin/bash

rm -Rf .tmp/gh-pages
git clone git@github.com:exteso/accessopolis.git .tmp/gh-pages
cd .tmp/gh-pages && git checkout gh-pages && cd ../..
rm -Rf .tmp/gh-pages/*
cp -Rp dist/* .tmp/gh-pages
cd .tmp/gh-pages 
git add .
git commit -m "new website version"
git push origin
