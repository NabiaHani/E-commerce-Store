import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from "../context/Context.jsx"

const HomePage = () => {
  const [auth] = useAuth()
  return (
    <Layout>
      <h1>Home Page</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  )
}

export default HomePage
