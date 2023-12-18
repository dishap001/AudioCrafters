
import { useRoutes } from 'react-router-dom'
import './App.css'
// import Menu from './MainMenu/Menu'
import routes from './Route/Route'
import LeftMenu from './MainMenu/LeftMenu';
import Home from './Home/Home';




function App() {
  
  const routing =useRoutes(routes);
    return (
    
      <div className='App'>
        <LeftMenu/>
        {routing}
      <div className='background'>
        <Home/>
      </div>
      </div>
    );
  }

export default App
