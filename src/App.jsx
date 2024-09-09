import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css'
import ExpensesList from './components/ExpensesList'
import { ThemeProvider } from './context/ThemeContext'


function App() {
  
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <InnerApp />
    </Router>
  )
}

function InnerApp() {
  const location = useLocation();
  const state = location.state;
  const backgroundLocation = state && state.backgroundLocation;
  return (
    <ThemeProvider>
      <div className='w-full min-h-screen bg-orange-400 p-10 font-poppins'>
          <Routes location={backgroundLocation || location}>
            <Route path="/" element={<ExpensesList />} />
            <Route path="/add-expense/" element={<ExpensesList />} />
            <Route path="/add-category/" element={<ExpensesList />} />
            <Route path="/add-wallet/" element={<ExpensesList />} />
          </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
