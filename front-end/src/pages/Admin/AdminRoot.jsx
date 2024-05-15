import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../../components/Admin/Header'
import { AdminContext } from '../../context/adminContext'
import AdminLogin from './Login'

const AdminRoot = () => {
    const { localAdmin } = useContext(AdminContext)
    return (
        <>
            <AdminHeader />
            {!localAdmin ? <AdminLogin /> : <Outlet />}
        </>
    )
}

export default AdminRoot
