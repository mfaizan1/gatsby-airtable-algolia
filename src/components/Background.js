import React from "react"
import BackgroundImage from "gatsby-background-image"
import styled, { keyframes } from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
const query = graphql`
  query MyQuery {
    file(relativePath: { eq: "mainBcg.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
const Background = ({ children }) => {
  const {
    file: {
      childImageSharp: { fluid },
    },
  } = useStaticQuery(query)
  console.log(fluid, "check")
  return (
    <Wrapper>
      <BackgroundImage
        preserveStackingContext={true}
        Tag="div"
        fluid={fluid}
        className="bcg"
      >
        {children}
      </BackgroundImage>
    </Wrapper>
  )
}

const fadeIn = keyframes`
      from{
         background-color:rgb(0,0,0,0.8);
      }
      to{
        background-color:rgba(0,0,0,0.4);
      }
      `

const Wrapper = styled.section`
  .bcg {
    /* MUST!!!!!! */
    min-height: 100vh;
    margin-top: -5rem;
    display: grid;
    place-items: center;
    animation: ${fadeIn} 2s ease-in-out 1 forwards;
  }
  .bcg::before {
    opacity: 1;
  }
`
export default Background
