import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'antd';
import { LocalUserContext } from '../../../context/usersContext';
import { delOne, getOne, patch, post } from '../../../services/API/requests';
import { enpoints } from '../../../services/constants';
import { Button } from '@mui/material';
import Order from '../../../classes/orderClass';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Basket = () => {
  const columns = [
    {
      title: 'Product',
      dataIndex: 'productId',
      render: (_, record) => <img src={record.imgSrc} alt="" style={{ width: "150px" }} />,
    },
    {
      title: 'Product ID',
      dataIndex: 'name',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.name.localeCompare(b.name),

    },
    {
      title: 'salePrice',
      dataIndex: 'salePrice',
      sorter: (a, b) => a.salePrice - b.salePrice
    },
    {
      title: 'count',
      dataIndex: 'count',
      sorter: (a, b) => a.count - b.count
    },
    {
      title: 'delete',
      dataIndex: 'productId',
      render: (_, record) => <a onClick={() => handleDel(record.productId)}>Delete</a>,
    }
  ];
  const { localUser } = useContext(LocalUserContext);
  const [basketItems, setBasketItems] = useState([]);
  const handleDel = (id) => {
    console.log(id);
    console.log(basketItems);
    const newitems = basketItems.filter((x) => (x.productId != id))
    setBasketItems(newitems)
    patch(enpoints.users, localUser.id, { ...localUser, basketItems: newitems })
    localStorage.setItem("usersBasket", JSON.stringify(newitems))
  }
  console.log(localUser);
  const handleorder = () => {

    getOne(enpoints.users, localUser.id).then((res) => {
      const loggedinuser = res.data
      console.log(loggedinuser);
      const neworder = new Order(loggedinuser.id, loggedinuser.balance)
      neworder.items = [basketItems]
      post(enpoints.orders, neworder)
      patch(enpoints.users, localUser.id, { ...localUser, basketItems: [] })
      setBasketItems([])
      localStorage.setItem("usersBasket", [])
      toast.success("your items gonderildi")
    });

  }
  useEffect(() => {
    const fetchBasketItems = async () => {
      if (localUser) {
        const res = await getOne(enpoints.users, localUser.id);
        if (res.data) {
          const basketItemsWithImg = await Promise.all(res.data.basketItems.map(async (item) => {
            const productRes = await getOne(enpoints.products, item.productId);
            return {
              ...item,
              imgSrc: productRes.data.imgSrc,
              name: productRes.data.name,
              salePrice: productRes.data.salePrice,
            };
          }));
          setBasketItems(basketItemsWithImg);
        }
      }
    };

    fetchBasketItems();
  }, [localUser]);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const localbasket = localStorage.getItem("usersBasket");
  return (
    <>  <Button onClick={() => { handleorder() }}>{!localbasket ? "" : "order"}</Button>
      <Table
        columns={columns}
        dataSource={basketItems}
        onChange={onChange}
        showSorterTooltip={{ target: 'sorter-icon' }}
      /></>

  );
};

export default Basket;
