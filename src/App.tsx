
import { useRoutes } from 'react-router-dom'
import './App.css'

import routes from './Route/Route'
import LeftMenu from './MainMenu/LeftMenu';


function App() {
  
  const routing =useRoutes(routes);
    return (
    
      <div className='App'>
        
            <LeftMenu/>
            {routing}
          <div className='background'>

          </div>
          
      </div>
    );
  }

export default App
