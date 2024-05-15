import AdminLogin from "../pages/Admin/Login";
import Basket from "../pages/Client/Basket";
import ClientRoot from "../pages/Client/ClientRoot";
import ContactUs from "../pages/Client/ContactUs/inex";
import Home from "../pages/Client/Home";
import ClientLogin from "../pages/Client/Login";
import ProductDetail from "../pages/Client/ProductDetail";
import ClientProducts from "../pages/Client/Products";
import Register from "../pages/Client/Register";
import User from "../pages/Client/User";
import AdminRoot from "../pages/Admin/AdminRoot";
import AdminProducts from "../pages/Admin/Products";
import AddProduct from "../pages/Admin/AddProduct";
import Users from "../pages/Admin/Users";
import Orders from "../pages/Admin/Orders";
import Categories from "../pages/Admin/Categories";
import AddCategory from "../pages/Admin/AddCategory";
import Dashboard from "../pages/Admin/Dashboard";
import AdminMessages from "../pages/Admin/Messages";

export const ROUTES=[
    {
        path: "/",
        element: <ClientRoot/>,
        children: [
          {
            index: true,
            element: <Home/>,
          },
          {
            path: "products",
            element: <ClientProducts/>,
          },
          {
            path: "products/:id",
            element: <ProductDetail/>,
          },
          {
            path: "basket",
            element: <Basket/>,
          },
          {
            path: "login",
            element: <ClientLogin/>,
          },
          {
            path: "user",
            element: <User/>,
          },
          {
            path: "register",
            element: <Register/>,
          },
          {
            path: "contact-us",
            element: <ContactUs/>,
          },
        ],
      },
      {
        path: "admin",
        element: <AdminRoot/>,
        children: [
          {
            index: true,
            element: <Dashboard/>,
          },
          {
            path: "messages",
            element: <AdminMessages/>,
          },
          {
            path: "products",
            element: <AdminProducts/>,
          },
          {
            path: "add-product",
            element: <AddProduct/>,
          },
          {
            path: "users",
            element: <Users/>,
          },
          {
            path: "orders",
            element: <Orders/>,
          },
          {
            path: "categories",
            element: <Categories/>,
          },
          {
            path: "add-category",
            element: <AddCategory/>,
          },{
            path:'login',
            element:<AdminLogin/>
          }
        ],
      },
]