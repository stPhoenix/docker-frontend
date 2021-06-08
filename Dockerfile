# syntax=docker/dockerfile:1

FROM node:12-alpine as builder
WORKDIR /frontend
COPY package.json /frontend/package.json
RUN npm install
COPY . /frontend
