import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import ClientHeader from '../../components/Client/Header'


const ClientRoot = () => {
  return (
    <>
      <ClientHeader />
     
      <Outlet/></>
  )
}

export default ClientRoot
