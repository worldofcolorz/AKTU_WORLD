import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Notes from './pages/Notes.jsx'
import Papers from './pages/Papers.jsx'
import Syllabus from './pages/Syllabus.jsx'
import Resources from './pages/Resources.jsx'
import './styles/global.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'notes', element: <Notes /> },
      { path: 'papers', element: <Papers /> },
      { path: 'syllabus', element: <Syllabus /> },
      { path: 'resources', element: <Resources /> }
    ]
  }
])

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)


