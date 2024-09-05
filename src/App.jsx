import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ExpensesList from './components/ExpensesList'

function App() {

  return (
    <>
    <div className='w-full min-h-screen bg-orange-400 p-10'>
      <ExpensesList />
    </div>
      
        
    </>
  )
}

export default App
