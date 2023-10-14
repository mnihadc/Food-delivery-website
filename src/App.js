import './App.css';
import Home from './Pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './Pages/Signup';
import CartProvider from './Components/ContextReducer';
import MyOrder from './Pages/MyOrder';

function App() {
  return (
    <CartProvider>
      <div>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/createuser' element={<Signup />} />
            <Route exact path='/myorder' element={<MyOrder/>} />
          </Routes>
        </Router>
      </div>
    </CartProvider>
  );
}

export default App;
