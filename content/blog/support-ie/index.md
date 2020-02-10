---
title: Support IE >= 9
date: "2020-02-10"
description: Support IE for react app
tags: ["react", "js"]
cover: "./preview.png"
---

## Steps

I use `react-scripts` to run my react app.

And it already includes `react-app-polyfill`

In order to support IE 9, 11

1. add `ie >=9` in `browserslist` of `package.json` file.

![](https://i.imgur.com/JakYNG0.png)

2. remove node_modules

```
rm -rf node_modules
```

3. in src/index.tsx

```
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
```

4. npm install again

```
npm i
```

## Reference

https://dotblogs.com.tw/wasichris/2019/06/20/234252
