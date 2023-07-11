import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Owner from './pages/Owner';
import Customer from './pages/Customer';
import CustomerRegister from './pages/CustomerRegister';
import OwnerRegister from './pages/OwnerRegister';
import OwnerProperties from './pages/OwnerProperties';
import Bookings from './pages/Bookings';
import BookingSlot from './pages/BookingSlot';
import ViewBooking from './pages/ViewBookings';
import History from './pages/History';
// import MapComponent from './pages/MapComponent';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Dashboard />}></Route>
            <Route path='/owner' element={<Owner />}></Route>
            <Route path='/customer' element={<Customer />}></Route>
            <Route path='/customerRegister' element={<CustomerRegister />}></Route>
            <Route path='/ownerRegister' element={<OwnerRegister />}></Route>
            <Route path='/ownerProperties' element={<OwnerProperties />}></Route>
            <Route path='/bookings' element={<Bookings />}></Route>
            <Route path='/bookingSlot' element={<BookingSlot />}></Route>
            <Route path='/viewBookings' element={<ViewBooking />}></Route>
            <Route path='/pastBookings' element={<History />}></Route>
            {/* <Route path='/mapInt' element={<MapComponent />}></Route> */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
