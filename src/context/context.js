import React, { useState } from "react"
import sublinks from "../constants/links"

const GatsbyContext = React.createContext()

const GatsbyProvider = ({ children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true)
  const [links, setLinks] = useState(sublinks)
  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen)
  }
  return (
    <GatsbyContext.Provider value={{ isSideBarOpen, links, toggleSidebar }}>
      {children}
    </GatsbyContext.Provider>
  )
}
export { GatsbyContext, GatsbyProvider }
