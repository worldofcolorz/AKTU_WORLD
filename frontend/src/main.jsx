import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Notes from './pages/Notes.jsx'
import Papers from './pages/Papers.jsx'
import Syllabus from './pages/Syllabus.jsx'
import Resources from './pages/Resources.jsx'
import NotFound from './pages/NotFound.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import './styles/global.css'

// errorElement is set on each CHILD route (not the parent `/` route) so that
// a render-time error in one page replaces just that page's content - the
// parent App's Navbar/Sidebar/Footer stay mounted and visible instead of the
// whole layout disappearing behind a bare, chrome-less error page.
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home />, errorElement: <ErrorPage /> },
      { path: 'notes', element: <Notes />, errorElement: <ErrorPage /> },
      { path: 'papers', element: <Papers />, errorElement: <ErrorPage /> },
      { path: 'syllabus', element: <Syllabus />, errorElement: <ErrorPage /> },
      { path: 'resources', element: <Resources />, errorElement: <ErrorPage /> },
      { path: '*', element: <NotFound /> }
    ]
  }
])

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)


