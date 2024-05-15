import React, { useDebugValue, useEffect, useState } from 'react'
import { getOne } from '../../../services/API/requests'
import { enpoints } from '../../../services/constants'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, CardActions, CardContent, CardMedia, Container, Typography } from '@mui/material'

const ProductDetail = () => {
  const { id } = useParams()
  const [detail, setDetail] = useState([])
  useEffect(() => {
    getOne(enpoints.products, id).then((res) => {
      setDetail(res.data)
    })
  }, [id])
  const navigate = useNavigate()
  return (
    <>
      <Container style={{ display: "flex", margin: "30px auto" }} >
        <Card sx={{ maxWidth: 500 }} >
          <CardMedia
            sx={{ height: 300 }}
            image={detail.imgSrc}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {detail.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {detail.description}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              price: <span style={{ textDecoration: "line-through", fontSize: "14px", color:"red" }} > {detail.costPrice}</span><span style={{ fontWeight: "600", marginLeft: "3px", fontSize: "18px" }}>{detail.salePrice}</span>
            </Typography>

          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => { navigate(-1) }}>Go Back</Button>
          </CardActions>
        </Card>
      </Container>
    </>
  )
}

export default ProductDetail
