import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { getAll, post } from '../../../services/API/requests'
import { enpoints } from '../../../services/constants'
import Category from '../../../classes/categoryClass'
import { CategoriesContext } from '../../../context/categoriesContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const AddCategory = () => {
  const { categories, setCategories } = useContext(CategoriesContext)
  const formik = useFormik({
    initialValues: {
      name: ''
    },
    onSubmit: value => {

      const categ = categories.find((x) => (x.name == value.name))
      if (!categ) {
        const newCategory = new Category(value.name)
        post(enpoints.categories, newCategory)
        formik.setValues({ name: "" })
        toast.success("category added")
        setCategories((currcat) => {
          return [...currcat, newCategory];
        });
      } 
      else {
       toast.error("category is already exists")
      }
    }
  })
  return (
    <>    <form onSubmit={formik.handleSubmit}>
      <TextField name='name' value={formik.values.name} onChange={formik.handleChange}></TextField>
      <Button type='submit'>add Category</Button>
    </form>
      <ToastContainer /></>

  )
}

export default AddCategory
