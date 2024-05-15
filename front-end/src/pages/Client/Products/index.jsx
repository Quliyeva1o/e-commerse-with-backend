import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../../context/productContext'
import { Button, Card, CardActions, CardContent, CardMedia, Container, FormControl, InputLabel, MenuItem, TextField, Typography } from '@mui/material';
import { LocalUserContext } from '../../../context/usersContext'
import ClientLogin from '../Login'
import { Link, useNavigate } from 'react-router-dom';
import { getOne, patch } from '../../../services/API/requests';
import { enpoints } from '../../../services/constants';
import { Select } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClientProducts = () => {
  const { products, setProducts } = useContext(ProductContext)
  const { localUser, setLocalUser } = useContext(LocalUserContext)
  const [loggedinUser, setLoggedinUser] = useState([])
  const [filteredProducts, setFilteredProducts] = useState(products)





  const navigate = useNavigate()
  useEffect(() => {
    localUser && getOne(enpoints.users, localUser.id).then((res) => {
      setLoggedinUser(res.data)
    })
  }, [localUser])

  useEffect(() => {
    setFilteredProducts(products)
  }, [products])

  const handlesubmit = (id) => {
    if (localUser) {
      const loggedinusersBasket = loggedinUser.basketItems.find((x) => (x.productId == id))
  
      if (loggedinusersBasket) {
        const ncount = loggedinusersBasket.count + 1
        const updatedBasketItems = loggedinUser.basketItems.map(item => item.productId === id ? { ...item, count: ncount } : item)
        const updatedUser = { ...loggedinUser, basketItems: updatedBasketItems }
  
        patch(enpoints.users, localUser.id, updatedUser)
        setLoggedinUser(updatedUser)
        localStorage.setItem("usersBasket", JSON.stringify(updatedBasketItems))
        toast.success("Product added to your basket")
      } else {
        const updatedBasketItems = [...loggedinUser.basketItems, { "productId": id, "count": 1 }]
        const updatedUser = { ...loggedinUser, basketItems: updatedBasketItems }
  
        patch(enpoints.users, localUser.id, updatedUser)
        setLoggedinUser(updatedUser)
        localStorage.setItem("usersBasket", JSON.stringify(updatedBasketItems))
        toast.success("Product added to your basket")
      }
    } else {
      navigate("/login");
    }
  }
  
  const handleSearch = (e) => {
    const filteredProductss = products.filter((x) => x.name.includes(e.target.value))
    setFilteredProducts(filteredProductss)
  }
  const handleSort = (e) => {
    if (e === "z-a") {
      setProducts([...products.sort((x, y) => y.salePrice - x.salePrice)]);
    } else if (e === "a-z") {
      setProducts([...products.sort((x, y) => x.salePrice - y.salePrice)]);
    } else {
      setProducts([...products]);
    }
  }
  const nameSort = (e) => {
    if (e === "z-a") {
      setProducts([...products.sort((x, y) => y.name.localeCompare(x.name))]);
    } else if (e === "a-z") {
      setProducts([...products.sort((x, y) => x.name.localeCompare(y.name))]);
    } else {
      setProducts([...products]);
    }
  }
  return (
    <>
      <Container style={{ margin: "30px auto" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            id="outlined-basic"
            label="Search by name"
            variant="outlined"
            onChange={(e) => { handleSearch(e) }}
            style={{ width: "200px", marginRight: "10px" }}
          />
          <FormControl style={{ width: "200px", marginRight: "10px" }}>
            <InputLabel id="demo-simple-select-label">sort by name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="sort by name"
              onChange={nameSort}
            >
              <MenuItem value={"a-z"}>a-z</MenuItem>
              <MenuItem value={"z-a"}>z-a</MenuItem>
            </Select>
          </FormControl>
          <FormControl style={{ width: "200px", marginRight: "10px" }}>
            <InputLabel id="demo-simple-select-label">sort by price</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="sort by price"
              onChange={handleSort}
            >
              <MenuItem value={"a-z"}>cheapest</MenuItem>
              <MenuItem value={"z-a"}>expensive</MenuItem>
            </Select>
          </FormControl>
        </div>

        <CardContent style={{ margin: "20px auto", display: "flex", gap: "30px", flexWrap: "wrap", justifyContent: "space-between" }}>

          {filteredProducts.map((product, idx) => {
            return (<Card key={idx} sx={{ minWidth: 245 }}>
              <CardMedia
                sx={{ height: 250 }}
                image={product.imgSrc}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ fontSize: "16px" }}>
                  price: <span style={{ textDecoration: "line-through", fontSize: "12px" }} > {product.costPrice}</span><span style={{ fontWeight: "600", marginLeft: "3px", fontSize: "18px" }}>{product.salePrice}</span>
                </Typography>
                <Typography>stock count:{product.stockCount}</Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => handlesubmit(product.id)} size="small">basket</Button>
                <Button size="small"><Link to={`/products/${product.id}`}>detail</Link></Button>
              </CardActions>
            </Card>)
          })}

        </CardContent>
      </Container>
      <ToastContainer />
    </>
  )
}

export default ClientProducts
