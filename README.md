# Personal Blog

## Add article

in `content/blog` folder,

run command:

```
npm run new <title-you-want>
```

## github action

I use [gatsby action](https://github.com/enriikke/gatsby-gh-pages-action).
And there's a bug, so need to add in `package.json`.
`"build": "gatsby build --prefix-paths",`

### Ref

https://www.gatsbyjs.org/docs/how-gatsby-works-with-github-pages/
