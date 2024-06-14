import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LogIn from './pages/LogIn/Login'
import SignUp from './pages/SignUp/Signup'

import AddChemical from './pages/AddChemical/AddChemical';
import AddGas from './pages/AddGas/AddGas'
import AddConsumables from './pages/AddConsumables/AddConsumables'
import LandingPage from './pages/LandingPage/LandingPage'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <LogIn/>
     <SignUp/>
<AddChemical/>
<AddGas/>
<AddConsumables/> */}
<LandingPage/>
    </>
  )
}

export default App
