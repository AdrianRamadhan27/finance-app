import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ExpensesList from './components/ExpensesList'
import { ThemeProvider } from './context/ThemeContext'

function App() {

  return (
    <ThemeProvider>
      <div className='w-full min-h-screen bg-orange-400 p-10 font-poppins'>
        <ExpensesList />
      </div>
    </ThemeProvider>
  )
}

export default App
