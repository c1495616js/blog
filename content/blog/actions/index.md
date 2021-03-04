---
title: Github Action running locally
date: "2020-03-03"
description: Running GHA locally without push to github back and forth.
tags: ["devops"]
cover: "./preview.png"
---

## Library: [@nektos/act](https://github.com/nektos/act)

> This requires docker installed.

### Steps:

- Installing Act:

1. Mac: `brew install act`
1. Linux: `curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash`
1. Windows: `choco install act-cli`

- Running Action locally: `act pull_request` in root folder (For detail, refer to [@nektos/act](https://github.com/nektos/act))
