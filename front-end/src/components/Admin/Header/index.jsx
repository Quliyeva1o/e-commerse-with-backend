import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { AdminContext } from '../../../context/adminContext';


function AdminHeader() {

  const { localAdmin } = React.useContext(AdminContext)

  return (
    <AppBar position='relative' style={{ backgroundColor: 'red' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          Admin
        </Typography>
        {localAdmin && <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {/* <Button><Link to={"/admin/login"}>login</Link></Button> */}
          <Button><Link to={"/admin/messages"}>messages</Link></Button>
          <Button><Link to={"/admin"}>dashboard</Link></Button>
          <Button><Link to={"/admin/products"}>products</Link></Button>
          <Button><Link to={"/admin/add-product"}>add product</Link></Button>
          <Button><Link to={"/admin/users"}>users</Link></Button>
          <Button><Link to={"/admin/orders"}>orders</Link></Button>
          <Button><Link to={"/admin/categories"}>categories</Link></Button>
          <Button><Link to={"/admin/add-category"}>add category</Link></Button>
        </Box>}

      </Toolbar>
    </AppBar>

  );
}

export default AdminHeader;
