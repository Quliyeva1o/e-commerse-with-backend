import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { ROUTES } from './routes'
import { LocalUserContext, UsersContext } from './context/usersContext'
import { useEffect, useState } from 'react'
import { getAll } from './services/API/requests'
import { enpoints } from './services/constants'
import { AdminContext } from './context/adminContext'
import { ProductContext } from './context/productContext'
import { CategoriesContext } from './context/categoriesContext'
import { MessageContext } from './context/messageContext'

function App() {
  const routes = createBrowserRouter(ROUTES)
  const [localUser, setLocalUser] = useState(null)
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [messages, setMessages] = useState([])
  const [localAdmin, setLocalAdmin] = useState(null)

  useEffect(() => {
    getAll(enpoints.users).then((res) => {
      setUsers(res.data)
    })
    getAll(enpoints.products).then((res) => {
      setProducts(res.data)
    })
    getAll(enpoints.categories).then((res) => {
      setCategories(res.data)
    })
    getAll(enpoints.messages).then((res) => {
      setMessages(res.data)
    })
    const loggedInUser = localStorage.getItem("loggedinUser");
    if (loggedInUser) {
      setLocalUser(JSON.parse(loggedInUser));
    }

    const loggedInAdmin = localStorage.getItem("loggedinAdmin")
    if (loggedInAdmin) {
      setLocalAdmin(JSON.parse(loggedInAdmin))
    }
  }, [])
  return (
    <AdminContext.Provider value={{ localAdmin, setLocalAdmin }}>
      <LocalUserContext.Provider value={{ localUser, setLocalUser }}>
        <UsersContext.Provider value={{ users, setUsers }}>
          <MessageContext.Provider value={{ messages, setMessages }}>
            <CategoriesContext.Provider value={{ categories, setCategories }}>
              <ProductContext.Provider value={{ products, setProducts }}>
                <RouterProvider router={routes} />
              </ProductContext.Provider>
            </CategoriesContext.Provider></MessageContext.Provider>
        </UsersContext.Provider>
      </LocalUserContext.Provider>
    </AdminContext.Provider>
  )
}

export default App
