import { Box, Button, FormGroup, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { userValidations } from '../../../validations/userValidations';
import User from '../../../classes/userClass';
import { post } from '../../../services/API/requests';
import { enpoints } from '../../../services/constants';
import { useNavigate } from 'react-router-dom';
import { UsersContext } from '../../../context/usersContext';

const Register = () => {
  const { users, setUsers } = useContext(UsersContext)
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      profileImg: '',
      balance: '',
    },
    onSubmit: values => {

      const newuser = new User(values.username, values.password, values.email, values.profileImg, values.balance)
      post(enpoints.users, newuser)
      navigate("/login")
      setUsers((currentUsers) => {
        return [...currentUsers, newuser]
      })
    },
    validationSchema: userValidations


  });

  return (
    <div>
      <Box

        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <FormGroup style={{ display: "flex", width: "1200px", margin: "30px auto", gap: "20px" }}>
          <TextField value={formik.values.username} onChange={formik.handleChange} id="outlined-basic" name="username" label="username" variant="outlined" />
          {formik.errors.username && <span style={{ color: 'red' }}>{formik.errors.username}</span>}

          <TextField value={formik.values.password} onChange={formik.handleChange} id="outlined-basic" name='password' label="password" variant="outlined" />
          {formik.errors.password && <span style={{ color: 'red' }}>{formik.errors.password}</span>}

          <TextField value={formik.values.confirmPassword} onChange={formik.handleChange} id="outlined-basic" name='confirmPassword' label="confirmPassword" variant="outlined" />
          {formik.errors.confirmPassword && <span style={{ color: 'red' }}>{formik.errors.confirmPassword}</span>}

          <TextField value={formik.values.email} onChange={formik.handleChange} name="email" id="outlined-basic" label="email" variant="outlined" />
          {formik.errors.email && <span style={{ color: 'red' }}>{formik.errors.email}</span>}

          <TextField value={formik.values.profileImg} onChange={formik.handleChange} name='profileImg' id="outlined-basic" label="profileImg" variant="outlined" />
          {formik.errors.profileImg && <span style={{ color: 'red' }}>{formik.errors.profileImg}</span>}

          <TextField value={formik.values.balance} onChange={formik.handleChange} name='balance' id="outlined-basic" label="balance" variant="outlined" />
          {formik.errors.balance && <span style={{ color: 'red' }}>{formik.errors.balance}</span>}

          <Button type='submit'>Register</Button>
        </FormGroup>
      </Box>
    </div>
  );
};

export default Register;
