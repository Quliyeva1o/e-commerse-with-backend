import React, { useContext, useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { ProductContext } from '../../../context/productContext';
import { delOne, getOne, patch } from '../../../services/API/requests'; // Ensure patch is imported
import { enpoints } from '../../../services/constants';
import { FormGroup, TextField } from '@mui/material';
import { useFormik } from 'formik';
import Product from '../../../classes/productClass';

const AdminProducts = () => {
  const { products, setProducts } = useContext(ProductContext)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [editpr, seteditpr] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const formik = useFormik({
    initialValues: {
      name: '',
      salePrice: '',
      costPrice: '',
      imgSrc: '',
      discountPercentage: '',
      description: '',
      categoryId: '',
      stockCount: '',
    },
    onSubmit: values => {
      const editedpr = new Product(values.name, values.salePrice, values.costPrice, values.imgSrc, values.discountPercentage, values.description, values.categoryId, values.stockCount)
      patch(enpoints.products, editpr.id, editedpr).then(() => {
        setOpen(false);
      }).catch(error => {
        console.error("Error editing product:", error);
      });

      const updatedProducts = products.map((product) => {
        if (product.id === editpr.id) {
          return { ...product, ...formik.values };
        }
        return product;
      });
      setProducts(updatedProducts);
    },
    
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const handleDel = (id) => {
    delOne(enpoints.products, id);
    const updatedProducts = products.filter((x) => x.id !== id);
    setProducts(updatedProducts);
  }

  useEffect(() => {
    if (editpr) {
      formik.setValues({
        name: editpr.name,
        salePrice: editpr.salePrice,
        costPrice: editpr.costPrice,
        imgSrc: editpr.imgSrc,
        discountPercentage: editpr.discountPercentage,
        description: editpr.description,
        categoryId: editpr.categoryId,
        id: editpr.id,
        createdAt: editpr.createdAt,
        stockCount: editpr.stockCount,
      });
    }
  }, [editpr])

useEffect(()=>{
  if (formik.values.name != '') {
    setModalContent(
      <FormGroup onSubmit={() => { formik.handleSubmit() }}>
        <TextField name="name" value={formik.values.name} onChange={formik.handleChange} />
        <TextField name="salePrice" value={formik.values.salePrice} onChange={formik.handleChange} />
        <TextField name="costPrice" value={formik.values.costPrice} onChange={formik.handleChange} />
        <TextField name="imgSrc" value={formik.values.imgSrc} onChange={formik.handleChange} />
        <TextField name="discountPercentage" value={formik.values.discountPercentage} onChange={formik.handleChange} />
        <TextField name="description" value={formik.values.description} onChange={formik.handleChange} />
        <TextField name="categoryId" value={formik.values.categoryId} onChange={formik.handleChange} />
        <TextField name="stockCount" value={formik.values.stockCount} onChange={formik.handleChange} />
      </FormGroup>
    );
  }
},[formik.values])
  const handleEdit = (id) => {

    getOne(enpoints.products, id).then((res) => {
      seteditpr(res.data);
      setOpen(true);

    }).catch(error => {
      console.error("Error fetching product:", error);
    });

  }
  const handleOk = () => {
    formik.handleSubmit();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Sale Price',
      dataIndex: 'salePrice',
      key: 'salePrice',
      width: '20%',
      ...getColumnSearchProps('salePrice'),
    },
    {
      title: 'createdAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      ...getColumnSearchProps('createdAt'),
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Delete',
      dataIndex: 'id',
      key: 'delete',
      render: (_, record) => <a onClick={() => handleDel(record.id)}>Delete</a>,
    },
    {
      title: 'Edit',
      dataIndex: 'id',
      key: 'edit',
      render: (_, record) => <a onClick={() => handleEdit(record.id)}>Edit</a>,
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={products} rowKey="id" />
      <Modal
        title="Edit Product"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        <div>{modalContent}</div>
      </Modal>
    </>
  );
};

export default AdminProducts;
