import { Box, Button, FormControl, FormGroup, TextField } from '@mui/material';
import { useFormik } from 'formik'
import React from 'react'
import { messageValidations } from '../../../validations/messageValidations';
import { post } from '../../../services/API/requests';
import { enpoints } from '../../../services/constants';
import Message from '../../../classes/messageClass';

const ContactUs = () => {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      title: '',
      message: ''
    },
    onSubmit: values => {
      console.log(values);
      const newmes=new Message(values.fullName,values.email,values.title,values.message)
      post(enpoints.messages,newmes)
      formik.resetForm()
    },
    validationSchema:messageValidations
  })
  return (
    <>

      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <FormGroup style={{width:"1200px" ,margin:"40px auto", gap:"20px"}}>
          <TextField label="Full Name" value={formik.values.fullName} onChange={formik.handleChange} name='fullName'></TextField>
          {formik.errors.fullName && <span style={{color:"red"}}>{formik.errors.fullName}</span>}
          <TextField label="email" value={formik.values.email} onChange={formik.handleChange} name='email'></TextField>
          {formik.errors.email && <span style={{color:"red"}}>{formik.errors.email}</span>}
          <TextField label="title" value={formik.values.title} onChange={formik.handleChange} name='title'></TextField>
          {formik.errors.title && <span style={{color:"red"}}>{formik.errors.title}</span>}
          <TextField label="message" value={formik.values.message} onChange={formik.handleChange} name='message'></TextField>
          {formik.errors.message && <span style={{color:"red"}}>{formik.errors.message}</span>}
          <Button type='submit' >Send message</Button>
        </FormGroup>
      </Box>
    </>
  )
}

export default ContactUs
