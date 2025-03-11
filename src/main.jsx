import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './components/AuthLayout.jsx'
import Post from './components/pages/Post.jsx'
import Home from './components/pages/Home.jsx'
import Login from './components/pages/Login.jsx'
import Signup from './components/pages/Signup.jsx'
import AllPosts from './components/pages/AllPosts.jsx'
import EditPost from './components/pages/EditPost.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path: 'all-posts',
        element: (
          <AuthLayout authentication={true}>
            <AllPosts />
          </AuthLayout>
        )
      },
      {
        path: 'edit-post/:slug',
        element: (
          <AuthLayout authentication={true}>
            <EditPost />
          </AuthLayout>
        )
      },
      {
        path: '/post/:slug',
        element: <Post />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
