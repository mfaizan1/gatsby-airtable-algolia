import React from "react"
import { graphql } from "gatsby"
import {
  Layout,
  Hero,
  About,
  Projects,
  Survey,
  Slider,
  GridProjects,
} from "../components"
import SEO from "../components/seo"

const HomePage = ({
  data: {
    allAirtable: { nodes: projects },
  },
}) => {
  return (
    <Layout>
      <Hero projects={projects} />
      <About />
      <Projects projects={projects} title="Latest 3 projects" home />
      <Slider />
    </Layout>
  )
}
export const query = graphql`
  {
    allAirtable(
      filter: { table: { eq: "projects" } }
      limit: 3
      sort: { order: DESC, fields: data___date }
    ) {
      nodes {
        table
        id
        data {
          date
          name
          type
          image {
            localFiles {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
export default HomePage
