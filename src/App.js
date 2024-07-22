
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import { ToastContainer } from 'react-toastify';
import Adminaccount from './Components/Adminaccount';
import Area from './Components/Area';
import Addincharger from './Components/Addincharger';
import Manageproducts from './Components/Manageproducts';
import Productproduction from './Components/Productproduction';
import Incharger from './Components/Incharger';
import Milkbooth from './Components/Milkbooth';
import Inchargerinfo from './Components/Inchargerinfo';
import Orders from './Components/Orders';
import Milkboothinfo from './Components/Milkboothinfo';
import MilkBoothStock from './Components/MilkBoothStock';
import Milkboothsales from './Components/Milkboothsales';
import Productsales from './Components/Productsales';
import Forgotpassword from './Components/Forgotpassword';
import Passwordset from './Components/Passwordset';
import Milkboothreport from './Components/Milkboothreport'; 

function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="adminaccount" element={<Adminaccount />} >
            <Route path="addarea" element={<Area />} />
            <Route path="addincharger" element={<Addincharger />} />
            <Route path="addproduct" element={<Manageproducts />} />
            <Route path="productproduction" element={<Productproduction />} />
            <Route path='productsales' element={<Productsales/>} />
            <Route path="milkboothreport" element={<Milkboothreport/>} />
          </Route>
          <Route path="incharger" element={<Incharger />} >
            <Route path="inchargerinfo" element={<Inchargerinfo />} />
            <Route path="orders" element={<Orders />} />
          </Route>
          <Route path="milkbooth" element={<Milkbooth />} >
            <Route path='milkboothinfo' element={<Milkboothinfo />} />
            <Route path='milkboothstock' element={<MilkBoothStock />} />
            <Route path='milkboothsales' element={<Milkboothsales/>} />
          </Route>
          <Route path="forgotpassword" element={<Forgotpassword/>} />
          <Route path="passwordset" element={<Passwordset/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
