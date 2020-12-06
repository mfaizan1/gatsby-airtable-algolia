import React, { useState, useEffect } from "react"
import styled from "styled-components"

const SearchButtons = ({ projects, setProjects, setProjectsToAll }) => {
  const types = ["all", ...new Set(projects.map(project => project.data.type))]
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (index === 0) {
      setProjectsToAll()
    } else {
      setProjects(projects.filter(elem => elem.data.type === types[index]))
    }
  }, [index])
  return (
    <Wrapper>
      {types.map((type, typeIndex) => (
        <button
          className={index === typeIndex ? "active" : undefined}
          key={type}
          onClick={() => setIndex(typeIndex)}
        >
          {type}
        </button>
      ))}
      <button></button>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  display: flex;
  margin-bottom: 0;
  justify-content: center;
  flex-wrap: wrap;
  button {
    margin: 0.5rem;
    text-transform: capitalize;
    background: transparent;
    border: transparent;
    color: var(--clr-grey-6);
    letter-spacing: var(--spacing);
    font-size: 1rem;
    padding: 0.25rem;
    cursor: pointer;
    outline: none;
    transition: var(--transition);
  }
  button:hover,
  button.active {
    box-shadow: 0px 1.5px 0 var(--clr-grey-6);
  }
`
export default SearchButtons
