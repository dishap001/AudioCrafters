
import { useRoutes } from 'react-router-dom'
// import './App.css'
import Header from './Header/Header'
import routes from './Route/Route'



function App() {
  
const routing =useRoutes(routes);
  return (
    <>
    <Header/>
    {routing}

    </>
  )
}

export default App
