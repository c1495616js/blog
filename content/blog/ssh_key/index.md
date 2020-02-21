---
title: SSH Key for new Account
date: "2020-02-21"
description: We have many kinds of repo in company, like gitlab, github and bitbucket.
tags: ["server", "git"]
cover: "./preview.png"
---

## 1. Generate New RSA Key

```
ssh-keygen -t rsa -C <email> -f <file name>

# ex:
ssh-keygen -t rsa -C "jerry@freshworks.io" -f id_rsa_fw
```

## 2. Config file

in `~/.ssh/config`

```
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_jerry_github (file name from step 1)
```

## Alias in .zshrc

```
alias fw-git-clone='git clone --config user.name="jerry" --config user.email=jerry@freshworks.io $@'
```
