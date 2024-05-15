import { Box, Button, FormGroup, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { LocalUserContext, UsersContext } from '../../../context/usersContext'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ClientLogin = () => {
  const { users } = useContext(UsersContext);
  const { setLocalUser } = useContext(LocalUserContext);
const navigate =useNavigate()
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: values => {
      console.log(values);
      const loggedinuser = users.find((x) => x.username == values.username && x.password == values.password)
      if (loggedinuser) {
      if(loggedinuser.role=="client"){
        console.log(loggedinuser);
        localStorage.setItem("loggedinUser", JSON.stringify({ "id": loggedinuser.id, "role": loggedinuser.role }))
        localStorage.setItem("usersBasket", JSON.stringify(loggedinuser.basketItems))

        setLocalUser(loggedinuser)
        navigate("/products")
        
      }
      else{
        toast.error("username or pass is incorrect")
      }
      }
      else {
       toast.error("username or pass is incorrect")
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
      <ToastContainer/>
    </div>
  )
}

export default ClientLogin
