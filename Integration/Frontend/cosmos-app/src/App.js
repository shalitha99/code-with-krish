import logo from './logo.svg';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'; 
import './App.css';
import { OrderManagement } from './components/order-management';
import { CustomerManagement } from './components/customer-management';
import { ProductManagement } from './components/product-management';

function App() {
  return (
   <>
   <BrowserRouter>
      <div>
        <nav>
          <Navigation nav={"Order Management"} url={"/orderManagement"}/>
          <Navigation nav={"Customer Management"} url={"/customermanagement"}/>
          <Navigation nav={"Product Management"} url={"/productmanagement"}/>
        </nav>
      </div>
      <Routes>
          <Route path="/orderManagement" element={<OrderManagement/>}/>
          <Route path="/customermanagement" element={<CustomerManagement/>}/>
          <Route path="/productmanagement" element={<ProductManagement/>}/>
      </Routes>
   </BrowserRouter>

   </>
  );
}

function Navigation({nav, url}){
  return(
    <li>
      <Link to={url}>{nav}</Link>
    </li>
  )
}
export default App;
