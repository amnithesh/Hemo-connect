import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './Components/Login';
import { Home } from './Components/Home';
import { Navbar } from './Components/Navbar';
import { Signup } from './Components/Signup';
import { SearchDonors } from './Components/SearchDonors';
import { AddDonor } from './Components/AddDonor';
import { BloodStock } from './Components/BloodStock'; // Import
import { AddStock } from './Components/AddStock';     // Import

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/search' element={<SearchDonors />} />
        <Route path='/add-donor' element={<AddDonor />} />
        {/* ADDED ROUTES */}
        <Route path='/stock' element={<BloodStock />} />
        <Route path='/add-stock' element={<AddStock />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;