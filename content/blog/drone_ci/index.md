---
title: Drone Learning
date: "2020-03-18"
description: My Learning for Drone CI/CD
tags: ["devops"]
cover: "./preview.png"
---

# [Drone](https://drone.io/)

## Introduction

> We love docker. And Drone builds anything in docker.
>
> Drone is a CI/CD tool built by Golang. It's light weight and fast and easily built with `docker-compose`.

- Build anything in docker. When building completed, it deletes all containers and left no garbage file in machine.

- Easy to learn and maintain.
- Use `.drone.yml` to trigger CI/CD pipeline, which means you can have version control.
- Using container to run all steps of pipeline, so it supports every language.
- Widely supports many repository services, like `gitlab`, `github`, `gitea`, `bitbucket`

### Structure of system

Drone uses `webhook` to trigger deployment, received by `Drone Server`. And `Drone Server` will allocate job to `Drone Agent` to execute pipeline.
![](2020-03-20-06-01-13.png)

### Deployment Steps

- Unit Test
- Build Code
- Build Image
- Deploy
- Success/Failure Notification
  ![](2020-03-20-06-05-57.png)

## Installation

[repo](https://github.com/CI-CD-Practice/Drone_Practice)

### Setup

- copy `.env` and input your credentials

```
cp .env.example .env
```

- ngrok generate https for testing

```
ngrok http 8081
```

![](2020-03-20-19-35-11.png)

replace `DRONE_SERVER_HOST=8e76ad03.ngrok.io` without `https://`

- Generate RPC Secret

```
 openssl rand -hex 16
```

replace `DRONE_RPC_SECRET=`

- generate github credential

![](2020-03-20-19-40-18.png)
![](2020-03-20-19-40-59.png)
![](2020-03-20-19-41-17.png)

- add webhook to the repo

![](2020-04-09-13-45-40.png)

### Start the App

```
docker-compose up -d
```

And navigate to `localhost:8081`

## How to write `.drone.yml`

// TODO

```yml
kind: pipeline
type: docker # 在 running docker in pipeline
name: clone # The name you can define yourself

steps:
  # Task 1
  - name: host
    image: alpine
    commands:
      - cat /etc/hosts
    when:
      status: [success, failure]
  # Task 2
  - name: echo
    image: plugins/git
    commands:
      - echo "78523"
    when:
      branch:
        - master
  # Task 3
  - name: dev_action
    image: plugins/git
    commands:
      - echo "111111"
    when:
      branch:
        - develop

trigger:
  branch:
    - master
  event:
    - push
```

## Deploy to S3

#### refs

https://medium.com/dailyjs/a-guide-to-deploying-your-react-app-with-aws-s3-including-https-a-custom-domain-a-cdn-and-58245251f081

http://plugins.drone.io/drone-plugins/drone-s3/

#### IAM

get access key id and access secret key
![](2020-04-09-11-20-03.png)

#### policy

![](2020-04-09-11-17-47.png)

#### S3 plugin

Because we are going to deploy the content of `build` folder, we use `plugins/s3-sync` instead of `plugins/s3`

```yml
 - name: deploy
  image: plugins/s3-sync:1
  settings:
    bucket: <bucket_name>
    access_key:
      from_secret: aws_access_key_id
    secret_key:
      from_secret: aws_secret_access_key
    region: us-west-1
    source: build
    target: /
```

## Use cases

- create-react-app to AWS S3
  [repo](https://github.com/c1495616js/drone_react_ec2)

## Drone Plugins

>Plugins are just Docker containers which means you can write plugins in any programming language that runs inside a container. You can even create plugins using simple bash scripting.

#### 4 Steps to writing Plugins

- write the code
- build docker image
- deploy to docker hub
- testing

#### example

[repo](https://github.com/CI-CD-Practice/drone_plugin_test)

```bash
#!/bin/sh

curl \
  -X ${PLUGIN_METHOD} \
  -d ${PLUGIN_BODY} \
  ${PLUGIN_URL}

```

## Build Images

![](2020-03-20-06-26-28.png)

## Next Step? Drone + Kubernetes

// TODO

## Who use drone

https://stackshare.io/drone-io