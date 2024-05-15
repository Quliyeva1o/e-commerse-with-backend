import { Box, Button, FormGroup, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import {  UsersContext } from '../../../context/usersContext'
import { AdminContext } from '../../../context/adminContext'

const AdminLogin = () => {
  const { users } = useContext(UsersContext);
  const { setLocalAdmin } = useContext(AdminContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: values => {
      const loggedinAdmin = users.find((x) => x.username == values.username && x.password == values.password)
      if (loggedinAdmin) {
        if (loggedinAdmin.role == "admin" || loggedinAdmin.role=="superadmin") {
          localStorage.setItem("loggedinAdmin", JSON.stringify({ "id": loggedinAdmin.id, "role": loggedinAdmin.role }))
          setLocalAdmin(loggedinAdmin)
        }
        else { console.log("admin deyilsiz") }
      }
      else {
        console.log("bele user yoxdu");
      }
    },

  })
  return (
    <div>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off">
        <FormGroup style={{ width: "70%", margin: "30px auto", gap: "20px" }}>
          <TextField id="outlined-basic" name='username' value={formik.values.username} onChange={formik.handleChange} label="username" variant="outlined" />
          <TextField id="outlined-basic" name='password' value={formik.values.password} onChange={formik.handleChange} label="password" variant="outlined" />
          <Button variant='contained' type='submit'>Log in</Button>
        </FormGroup>
      </Box>
    </div>
  )
}

export default AdminLogin
