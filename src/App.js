import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import MainNavigation from './routes/mainNavigation';
import Authenticate from './context/authenticate';

function App() {
  return (
    <Router>
      <Authenticate>
        <MainNavigation />
      </Authenticate>
    </Router>

  )
}

export default App;
