import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomeScreen from './Pages/HomeScreen'

function App() {
  const [count, setCount] = useState(0)

  return (

     <HomeScreen/>
 
  )
}

export default App
