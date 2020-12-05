import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Title from "./Title"
import styled from "styled-components"
import Image from "gatsby-image"
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa"
import { FiChevronRight, FiChevronLeft } from "react-icons/fi"
const query = graphql`
  {
    allAirtable(
      filter: { table: { eq: "customers" } }
      limit: 3
      sort: { order: DESC, fields: data___date }
    ) {
      nodes {
        table
        id
        data {
          name
          quote
          title
          image {
            localFiles {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`
const Slider = () => {
  const {
    allAirtable: { nodes: customers },
  } = useStaticQuery(query)
  const [index, setIndex] = React.useState(1)

  React.useEffect(() => {
    if (index > customers.length - 1) {
      setIndex(0)
    } else if (index < 0) {
      setIndex(customers.length - 1)
    }
  }, [index, customers])

  return (
    <Wrapper className="section">
      <Title>reviews</Title>
      <div className="section-center">
        {customers.map((customer, customerIndex) => {
          const {
            data: { image, name, title, quote },
          } = customer
          const customerImage = image.localFiles[0].childImageSharp.fixed
          let position = "nextSlide"
          if (customerIndex === index) {
            position = "activeSlide"
          }
          if (
            customerIndex - 1 === index ||
            (index === 0 && customerIndex === customers.length - 1)
          ) {
            position = "lastSlide"
          }
          return (
            <article className={position}>
              <Image fixed={customerImage} className="img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          )
        })}
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <FaChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FaChevronRight />
        </button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: var(--clr-grey-10);
  .section-center {
    margin-top: 4rem;
    width: 80vw;
    height: 450px;
    max-width: 800px;
    text-align: center;
    position: relative;
    display: flex;
    overflow: hidden;
    .img {
      border-radius: 50%;
      margin-bottom: 1rem;
    }
    h4 {
      text-transform: uppercase;
      color: var(--clr-primary-5);
      margin-bottom: 0.25rem;
    }
    .title {
      text-transform: capitalize;
      margin-bottom: 0.75rem;
    }
    .text {
      max-width: 45em;
      margin: 0 auto;
      line-height: 2;
      color: var(--clr-grey-5);
    }
    .icon {
      font-size: 3rem;
      margin-top: 1rem;
      color: var(--clr-primary-5);
    }
    .prev,
    .next {
      position: absolute;
      top: 200px;
      transform: translateY(-50%);
      background: var(--clr-grey-5);
      color: var(--clr-white);
      width: 1.25rem;
      height: 1.25rem;
      display: grid;
      place-items: center;
      border-color: transparent;
      font-size: 1rem;
      border-radius: var(--radius);
      cursor: pointer;
      transition: var(--transition);
    }
    .prev:hover,
    .next:hover {
      background: var(--clr-primary-5);
    }
    .prev {
      left: 0;
    }
    .next {
      right: 0;
    }
    @media (min-width: 800px) {
      .prev,
      .next {
        width: 2rem;
        height: 2rem;
        font-size: 1.5rem;
      }
    }
    article {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: var(--transition);
    }
    article.activeSlide {
      opacity: 1;
      transform: translateX(0);
    }
    article.lastSlide {
      transform: translateX(-100%);
    }
    article.nextSlide {
      transform: translateX(100%);
    }
  }
`
export default Slider
