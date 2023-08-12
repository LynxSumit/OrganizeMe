import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { TaskProvider } from './context/Task.Context.jsx'
import { UserProvider } from './context/User.Context.jsx'


export const server = "https://node-todo-app-pnlf.onrender.com/api/v1"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <UserProvider>
  <TaskProvider>
    <App />

  </TaskProvider>
  </UserProvider>
  </React.StrictMode>,
)
