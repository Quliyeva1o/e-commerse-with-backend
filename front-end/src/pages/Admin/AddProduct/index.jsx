import { Box, Button, FormControl, FormGroup, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { productValidation } from '../../../validations/productValidations'
import Product from '../../../classes/productClass'
import { post } from '../../../services/API/requests'
import { enpoints } from '../../../services/constants'
import { CategoriesContext } from '../../../context/categoriesContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ProductContext } from '../../../context/productContext'

const AddProduct = () => {
  const { categories, setCategories } = useContext(CategoriesContext)
  const { products, setProducts } = useContext(ProductContext)

  const formik = useFormik({
    initialValues: {
      name: "",
      salePrice: "",
      costPrice: "",
      imgSrc: "",
      discountPercentage: "",
      description: "",
      categoryId: "",
      stockCount: "",
    },
    onSubmit: values => {

      console.log("Submitted values:", values)
      const newProduct = new Product(values.name, values.salePrice, values.costPrice, values.imgSrc, values.discountPercentage, values.description, values.categoryId, values.stockCount)
      post(enpoints.products, newProduct)
      formik.resetForm()
      toast.success("product added")
      setProducts((currentproducts) => {
        return [...currentproducts, newProduct];
      });
      
    },
    validationSchema: productValidation
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
        autoComplete="off">
        <FormGroup style={{ display: "flex", width: "1200px", margin: "30px auto", gap: "20px" }}>
          <TextField value={formik.values.name} onChange={formik.handleChange} id="outlined-basic" name="name" label="name" variant="outlined" />
          {formik.errors.name && <span style={{ color: 'red' }}>{formik.errors.name}</span>}
          <TextField value={formik.values.salePrice} onChange={formik.handleChange} id="outlined-basic" name="salePrice" label="Sale Price" variant="outlined" />
          {formik.errors.salePrice && <span style={{ color: 'red' }}>{formik.errors.salePrice}</span>}
          <TextField value={formik.values.costPrice} onChange={formik.handleChange} id="outlined-basic" name="costPrice" label="Cost Price" variant="outlined" />
          {formik.errors.costPrice && <span style={{ color: 'red' }}>{formik.errors.costPrice}</span>}
          <TextField value={formik.values.imgSrc} onChange={formik.handleChange} id="outlined-basic" name="imgSrc" label="Image Src" variant="outlined" />
          {formik.errors.imgSrc && <span style={{ color: 'red' }}>{formik.errors.imgSrc}</span>}
          <TextField value={formik.values.discountPercentage} onChange={formik.handleChange} id="outlined-basic" name="discountPercentage" label="Discount Percentage" variant="outlined" />
          {formik.errors.discountPercentage && <span style={{ color: 'red' }}>{formik.errors.discountPercentage}</span>}
          <TextField value={formik.values.description} onChange={formik.handleChange} id="outlined-basic" name="description" label="description" variant="outlined" />
          {formik.errors.description && <span style={{ color: 'red' }}>{formik.errors.description}</span>}
          <TextField value={formik.values.stockCount} onChange={formik.handleChange} id="outlined-basic" name="stockCount" label="stockCount" variant="outlined" />
          {formik.errors.stockCount && <span style={{ color: 'red' }}>{formik.errors.stockCount}</span>}

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.categoryId}
                label="Age"
                name="categoryId"
                onChange={formik.handleChange}
              >
                {categories.map((mycategory) => {
                  return (
                    <MenuItem key={mycategory.id} value={mycategory.id}>{mycategory.name}</MenuItem>
                  )
                })}


              </Select>
            </FormControl>
          </Box>
          <Button type='submit' >Add Product</Button>
        </FormGroup>
      </Box>
      <ToastContainer />
    </>
  )
}

export default AddProduct
