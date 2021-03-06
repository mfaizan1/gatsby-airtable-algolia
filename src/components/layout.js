/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useContext } from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Sidebar from "./Sidebar"
import { GatsbyContext } from "../context/context"
const Layout = ({ children }) => {
  const data = useContext(GatsbyContext)
  const { isSideBarOpen } = data
  return (
    <>
      <Navbar />
      {isSideBarOpen && <Sidebar />}
      {children}
      {/* <Footer /> */}
    </>
  )
}

export default Layout
