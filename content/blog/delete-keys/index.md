---
title: Object without specific key
date: "2020-07-20"
description: Another way to delete the sensitive key
tags: ["js"]
cover: "./preview.png"
---

We can do another way to have same as below.

```ts
delete dto.password
const update: Partial<UserEntity> = { ...dto }
```

Just use destructure:

```ts
const { password, ...update } = dto
```

And since there's `unused variable`, we need to add a new rule in `.eslintrc`.

```js
rules: {
  '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
}
```
