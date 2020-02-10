import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PersonalBlog from "../containers/HomePage"
import SEO from "../components/seo"

const PersonalBlogPage = (props: any) => {
  const { data } = props

  return (
    <Layout>
      <SEO
        title="Personal Blog Lite"
        description={data.site.siteMetadata.description}
      />
      <PersonalBlog />
    </Layout>
  )
}

export default PersonalBlogPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
